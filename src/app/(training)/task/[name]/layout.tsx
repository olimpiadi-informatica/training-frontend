"use client";

import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import type { ReactNode } from "react";

import { Trans } from "@lingui/macro";
import { Tabs } from "@olinfo/react-components";
import { type Task, getTask } from "@olinfo/training-api";
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
            <div>
              <Trans>Limite di tempo:</Trans> {task?.time_limit ? `${task.time_limit} sec` : "N/A"}
            </div>
            <div className="max-sm:hidden">/</div>
            <div>
              <Trans>Limite di memoria:</Trans>{" "}
              {task?.memory_limit ? `${task.memory_limit / (1 << 20)} MB` : "N/A"}
            </div>
          </div>
          <div className="text-center">
            <Trans>Punteggio massimo:</Trans> {Math.round(task.score_multiplier * 100)}
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
        <Tab page="">
          <Trans>Testo</Trans>
        </Tab>
        <Tab page="attachments">
          <Trans>Allegati</Trans>
        </Tab>
        <Tab page="tags">
          <Trans>Tags</Trans>
        </Tab>
        <Tab page="stats">
          <Trans>Statistiche</Trans>
        </Tab>
        <Tab page="submit">
          <Trans>Invia</Trans>
        </Tab>
        <Tab page="submissions">
          <Trans>Sottoposizioni</Trans>
        </Tab>
      </Tabs>
      {children}
    </div>
  );
}

type TabProps = {
  page: string;
  children: ReactNode;
};

function Tab({ page, children }: TabProps) {
  const selectedPage = useSelectedLayoutSegment() ?? "";
  const { name: taskName } = useParams();

  return (
    <Link
      role="tab"
      className={clsx("tab", selectedPage === page && "tab-active")}
      href={`/task/${taskName}/${page}`}
      prefetch>
      {children}
    </Link>
  );
}
