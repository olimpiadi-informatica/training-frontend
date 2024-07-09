"use client";

import Link from "next/link";

import { Trans } from "@lingui/macro";
import { Task, getTask } from "@olinfo/training-api";
import useSWR from "swr";

import { H2 } from "~/components/header";
import { useUser } from "~/components/user";

import { SubmitBatch } from "./batch";
import { SubmitOutputOnly } from "./output-only";
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
        <H2>
          <Trans>Invia soluzione</Trans>
        </H2>
        <div className="my-2">
          <Trans>Accedi per inviare soluzioni</Trans>
        </div>
        <Link
          href={`/login?redirect=${encodeURIComponent(`/task/${params.name}/submit`)}`}
          className="btn btn-primary">
          <Trans>Accedi</Trans>
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
