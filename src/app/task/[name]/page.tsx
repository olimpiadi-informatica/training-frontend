"use client";

import { Suspense, lazy } from "react";

import { useLingui } from "@lingui/react";
import { type Task, fileUrl, getTask } from "@olinfo/training-api";
import useSWR from "swr";

import Attachments from "./attachments/page";
import Submit from "./submit/page";
import Tags from "./tags/page";

const MobileStatement = lazy(() => import("./mobile-statement"));

type Props = {
  params: { name: string };
};

export default function Page({ params }: Props) {
  const { i18n } = useLingui();

  const { data: task } = useSWR<Task, Error, [string, string]>(
    ["api/task", params.name],
    ([, ...params]) => getTask(...params),
    { revalidateIfStale: false },
  );

  const statement =
    task &&
    fileUrl({
      name: "testo.pdf",
      digest: task.statements[i18n.locale] ?? Object.values(task.statements)[0],
    });

  return (
    <div className="grid grow gap-4 lg:grid-cols-[1fr_18rem]">
      <div className="relative min-h-[75vh] overflow-hidden rounded-lg">
        <div className="absolute inset-0">
          {statement ? (
            navigator.pdfViewerEnabled ? (
              <object data={statement} className="size-full" />
            ) : (
              <Suspense fallback={<LoadingStatement />}>
                <MobileStatement url={statement} fallback={<LoadingStatement />} />
              </Suspense>
            )
          ) : (
            <LoadingStatement />
          )}
        </div>
      </div>
      <div className="max-lg:hidden">
        <div className="grid gap-8">
          <Submit params={params} />
          <Attachments params={params} />
          <Tags params={params} />
        </div>
      </div>
    </div>
  );
}

function LoadingStatement() {
  return <div className="skeleton absolute inset-0 rounded-none" />;
}
