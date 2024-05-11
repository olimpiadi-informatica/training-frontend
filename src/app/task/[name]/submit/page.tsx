"use client";

import Link from "next/link";

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
