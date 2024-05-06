"use client";

import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";

import { Tabs } from "@olinfo/react-components";
import { Task, getTask } from "@olinfo/training-api";
import clsx from "clsx";
import useSWR from "swr";

type Props = {
  params: { name: string };
  children: ReactNode;
};

export default function Layout({ params, children }: Props) {
  const { data: task } = useSWR<Task, Error, [string, string]>(
    ["api/task", params.name],
    ([, ...params]) => getTask(...params),
  );

  return (
    <div className="flex grow flex-col gap-4">
      {task ? (
        <div>
          <h1 className="text-center text-3xl font-bold">{task?.title}</h1>
          <div className="flex flex-col items-center justify-center gap-x-2 sm:flex-row">
            <div>Limite di tempo: {task?.time_limit ? `${task.time_limit} sec` : "N/A"}</div>
            <div className="max-sm:hidden">/</div>
            <div>
              Limite di memoria:{" "}
              {task?.memory_limit ? `${task.memory_limit / (1 << 20)} MB` : "N/A"}
            </div>
          </div>
          <div className="text-center">
            Punteggio massimo: {Math.round(task.score_multiplier * 100)}
          </div>
        </div>
      ) : (
        <div>
          <div className="skeleton mx-auto my-1 h-7 w-full max-w-xs" />
          <div className="skeleton mx-auto my-1 h-5 w-full max-w-sm" />
          <div className="skeleton mx-auto my-1 h-5 w-full max-w-xs" />
        </div>
      )}
      <Tabs>
        <Tab page="">Testo</Tab>
        <Tab page="attachments" className="lg:hidden">
          Allegati
        </Tab>
        <Tab page="tags" className="lg:hidden">
          Tag
        </Tab>
        <Tab page="stats">Statistiche</Tab>
        <Tab page="submit" className="lg:hidden">
          Invia
        </Tab>
        <Tab page="submissions">Sottoposizioni</Tab>
      </Tabs>
      {children}
    </div>
  );
}

type TabProps = {
  page: string;
  className?: string;
  children: ReactNode;
};

function Tab({ page, className, children }: TabProps) {
  const selectedPage = useSelectedLayoutSegment() ?? "";
  const { name: taskName } = useParams();

  return (
    <Link
      role="tab"
      className={clsx("tab", selectedPage === page && "tab-active", className)}
      href={`/task/${taskName}/${page}`}
      prefetch>
      {children}
    </Link>
  );
}
