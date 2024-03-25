"use client";

import { Task, fileUrl, getTask } from "@olinfo/training-api";
import useSWR from "swr";

import Attachments from "./attachments/page";
import { Skeleton } from "./skeleton";
import Submit from "./submit/page";
import Tags from "./tags/page";

type Props = {
  params: { name: string };
};

export default function Page({ params }: Props) {
  const { data: task } = useSWR<Task, Error, [string, string]>(
    ["api/task", params.name],
    ([, ...params]) => getTask(...params),
    { revalidateIfStale: false },
  );

  if (!task) return <Skeleton params={params} />;

  const statement = fileUrl({
    name: "testo.pdf",
    digest: task.statements["it"] ?? Object.values(task.statements)[0],
  });

  return (
    <div className="flex items-stretch gap-4">
      <object data={statement} className="min-h-screen grow overflow-hidden rounded-lg" />
      <div className="grid basis-72 gap-8 max-lg:hidden">
        <Submit params={params} />
        <Attachments params={params} />
        <Tags params={params} />
      </div>
    </div>
  );
}
