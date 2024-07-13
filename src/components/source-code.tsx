import Link from "next/link";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Code } from "@olinfo/react-components";
import { truncate } from "lodash-es";
import { Download, FileCode2 } from "lucide-react";
import useSWR from "swr";

import { Language, fileLanguage } from "~/lib/language";

export function SourceCode({ url }: { url: string }) {
  const { _ } = useLingui();

  const { data: source } = useSWR(["fetch", url], sourceFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const lang = fileLanguage(url) ?? Language.Plain;

  if (lang === Language.Scratch) {
    return (
      <div className="grid justify-center">
        <Link href={url} className="btn btn-primary" download>
          <FileCode2 size={22} /> <Trans>Scarica codice</Trans>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-box border border-base-content/10">
      {source !== undefined ? (
        <Code
          code={truncate(source, { length: 100_000 }).trimEnd()}
          lang={lang}
          className="max-h-[75vh] overflow-auto text-xs *:p-4"
        />
      ) : (
        <div className="skeleton h-[75vh]" />
      )}
      <div className="absolute right-0 top-0 flex rounded-bl-xl border-b border-l border-base-content/10 bg-base-100">
        <Link
          href={url}
          className="btn btn-square btn-ghost forced-colors:border-none"
          aria-label={_(msg`Scarica codice`)}
          download>
          <Download />
        </Link>
      </div>
    </div>
  );
}

async function sourceFetcher([, url]: [string, string]) {
  const res = await fetch(url);
  return res.text();
}
