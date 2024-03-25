import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import useSWR from "swr";

import style from "./statement.module.css";

import "katex/dist/katex.css";

export default function Statement({ path }: { path: string }) {
  const { data: source } = useSWR(["terry/files", path], fetcher, {
    revalidateIfStale: false,
    suspense: true,
  });

  const dirname = path.replace(/\/[^/]*$/, "");

  return (
    <div className={style.statement}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        urlTransform={(url) => (URL.canParse(url) ? url : `/api-terry/files${dirname}/${url}`)}>
        {source}
      </ReactMarkdown>
    </div>
  );
}

async function fetcher([, path]: [string, string]) {
  const resp = await fetch(`/api-terry/files${path}`);
  return resp.text();
}
