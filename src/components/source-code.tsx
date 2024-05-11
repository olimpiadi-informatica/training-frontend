import Link from "next/link";

import { truncate } from "lodash-es";
import { Download } from "lucide-react";
import useSWR from "swr";

export function SourceCode({ url }: { url: string }) {
  const { data: source } = useSWR(["shiki", url], sourceFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <div className="relative overflow-hidden rounded-box border border-base-content/10">
      {source ? (
        <div
          className="max-h-[min(32rem,75vh)] overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: source }}
        />
      ) : (
        <div className="skeleton h-[min(32rem,75vh)]" />
      )}
      <div className="absolute right-0 top-0 flex rounded-bl-xl border-b border-l border-base-content/10 bg-base-100">
        <Link
          href={url}
          className="btn btn-square btn-ghost"
          aria-label="Scarica soluzione"
          download>
          <Download />
        </Link>
      </div>
    </div>
  );
}

async function sourceFetcher([, url]: [string, string]) {
  const res = await fetch(url);
  const text = truncate(await res.text(), { length: 100_000 }).trimEnd();
  const lang = url.match(/\.(\w+)$/)?.[1] ?? "txt";

  const { codeToHtml } = await import("shiki");
  return codeToHtml(text, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
}
