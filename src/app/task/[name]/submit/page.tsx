"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Form,
  FormValidation,
  MultipleFileField,
  SelectField,
  SingleFileField,
  SubmitButton,
} from "@olinfo/react-components";
import { Task, getTask, submitBatch, submitOutputOnly } from "@olinfo/training-api";
import { sortBy } from "lodash-es";
import { Send } from "lucide-react";
import useSWR from "swr";

import { H2 } from "~/components/header";
import { useUser } from "~/components/user";

import { Skeleton } from "./skeleton";

type Props = {
  params: { name: string };
};

export default function Page({ params }: Props) {
  const { data: task } = useSWR<Task, Error, [string, string]>(
    ["api/task", params.name],
    ([, ...params]) => getTask(...params),
    { revalidateIfStale: false },
  );

  const user = useUser();

  if (!user) {
    return (
      <div className="text-center">
        <H2>Invia soluzione</H2>
        <div className="my-2">Accedi per inviare soluzioni</div>
        <Link
          href={`/login?redirect=${encodeURIComponent(`/task/${params.name}/submit`)}`}
          className="btn btn-primary">
          Accedi
        </Link>
      </div>
    );
  }

  if (!task) return <Skeleton />;

  return task.task_type === "OutputOnly" ? (
    <SubmitOutputOnly task={task} />
  ) : (
    <SubmitBatch task={task} />
  );
}

function SubmitOutputOnly({ task }: { task: Task }) {
  const router = useRouter();

  const validate = (files: Record<string, File>): FormValidation => {
    for (const output of task.submission_format) {
      if (!files[output]) return ["error", `File "${output}" mancante`];
    }
  };

  const submit = async ({ outputs }: { outputs: Record<string, File> }) => {
    const sub = await submitOutputOnly(task, outputs);
    router.push(`/task/${task.name}/submissions/${sub.id}`);
    await new Promise(() => {});
  };

  return (
    <Form onSubmit={submit}>
      <H2>Invia output</H2>
      <div>Devi inviare i seguenti file:</div>
      <div className="columns-2 text-sm">
        {sortBy(task.submission_format).map((file) => (
          <div key={file}>{file}</div>
        ))}
      </div>
      <MultipleFileField field="outputs" label="File di output" accept=".txt" validate={validate} />
      <SubmitButton icon={Send}>Invia</SubmitButton>
    </Form>
  );
}

function SubmitBatch({ task }: { task: Task }) {
  const router = useRouter();

  const validateLang = (lang: string): ["warning", string] | undefined => {
    switch (lang) {
      case "Pascal / fpc":
        return [
          "warning",
          "Probabilmente hai sbagliato a selezionare il linguaggio, in caso contrario ti suggeriamo di smettere di usare Pascal e imparare un linguaggio più moderno.",
        ];
      case "Java / JDK":
        return [
          "warning",
          `Assicurati di chiamare la tua classe "${task.submission_format[0].replace(".%l", "")}", altrimenti la compilazione non andrà a buon fine.`,
        ];
    }
  };

  const submit = async (value: { lang: string; src: File }) => {
    const sub = await submitBatch(task, value.lang, value.src!);
    router.push(`/task/${task.name}/submissions/${sub.id}`);
    await new Promise(() => {});
  };

  return (
    <Form defaultValue={{ lang: task.supported_languages[0] }} onSubmit={submit}>
      <H2>Invia soluzione</H2>
      <SelectField
        field="lang"
        label="Linguaggio"
        options={Object.fromEntries(task.supported_languages.map((l) => [l, l]))}
        validate={validateLang}
      />
      <SingleFileField field="src" label="Codice sorgente" />
      <SubmitButton icon={Send}>Invia</SubmitButton>
    </Form>
  );
}
