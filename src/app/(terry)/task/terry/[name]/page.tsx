"use client";

import { notFound } from "next/navigation";
import { Suspense, lazy } from "react";

import { useTerryUser } from "~/components/user";

import Submit from "./submit/page";

const Statement = lazy(() => import("./statement"));

type Props = {
  params: { name: string };
};

export default function Page({ params: { name: taskName } }: Props) {
  const user = useTerryUser();

  const task = user?.contest.tasks.find((t) => t.name === taskName);
  if (user && !task) return notFound();

  return (
    <div className="flex items-stretch gap-4">
      {task ? (
        <Suspense fallback={<Loading />}>
          <Statement path={task.statement_path} />
        </Suspense>
      ) : (
        <Loading />
      )}
      <div className="shrink-0 basis-72 max-lg:hidden">
        <div className="my-6">
          <Submit params={{ name: taskName }} />
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex grow items-center justify-center">
      <span className="loading loading-dots w-12" />
    </div>
  );
}
