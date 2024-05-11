import { useEffect, useId, useRef } from "react";

import { shikiToMonaco } from "@shikijs/monaco";
import * as monaco from "monaco-editor-core";
import { getHighlighter } from "shiki";
import useSWR from "swr";

import { useTheme } from "~/lib/theme";

self.MonacoEnvironment = {
  getWorker: function (_moduleId: string, label: string) {
    if (label !== "editorWorkerService") throw new Error(`Unknown module: ${label}`);
    return new Worker(
      new URL("monaco-editor-core/esm/vs/editor/editor.worker.js", import.meta.url),
    );
  },
};

type Props = {
  language: string;
  languages: string[];
  onChange: (value: string) => void;
  file?: File;
};

export default function Editor({ language, languages, file, onChange }: Props) {
  useEffect(() => {
    for (const lang of languages) {
      monaco.languages.register({ id: lang.toLowerCase() });
    }
  }, [languages]);

  const { isLoading } = useSWR("shiki/monaco", fetchHighlighter, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  const id = useId();
  const defaultLang = useRef(language);

  const model = useRef<monaco.editor.ITextModel | null>(null);
  useEffect(() => {
    if (isLoading) return;
    const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "github-dark"
      : "github-light";

    // eslint-disable-next-line unicorn/prefer-query-selector
    const container = document.getElementById(id)!;

    const defaultValue = localStorage.getItem("editor-source-code") ?? initialCode;

    const editor = monaco.editor.create(container, {
      value: defaultValue,
      language: defaultLang.current.toLowerCase(),
      theme: defaultTheme,
      automaticLayout: true,
    });
    model.current = editor.getModel();

    onChange(defaultValue);
    editor.onDidChangeModelContent(() => {
      onChange(model.current?.getValue() ?? "");
      localStorage.setItem("editor-source-code", model.current?.getValue() ?? "");
    });

    return () => editor?.dispose();
  }, [id, isLoading, onChange]);

  useEffect(() => {
    if (model.current) {
      monaco.editor.setModelLanguage(model.current, language.toLowerCase());
    }
  }, [language]);

  const theme = useTheme();
  useEffect(() => {
    monaco.editor.setTheme(theme === "dark" ? "github-dark" : "github-light");
  }, [theme]);

  useEffect(() => {
    if (!file || file.size > 100_000) return;
    file.text().then((text) => {
      if (model.current) model.current.setValue(text);
    });
  }, [file]);

  return <div id={id} />;
}

async function fetchHighlighter() {
  const highlighter = await getHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["c", "cpp", "python", "pascal", "java", "text"],
  });
  shikiToMonaco(highlighter, monaco);
}

const initialCode = `\
#include <iostream>
using namespace std;

int main() {
  cout << "Hello, world!" << endl;
  return 0;
}
`;
