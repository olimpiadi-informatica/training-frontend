"use client";

import Link from "next/link";
import { notFound, useParams, useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";

import { Trans } from "@lingui/macro";
import { Tabs } from "@olinfo/react-components";
import clsx from "clsx";

import { useTerryUser } from "~/components/user";

type Props = {
  params: { name: string };
  children: ReactNode;
};

export default function Layout({ params: { name: taskName }, children }: Props) {
  const user = useTerryUser();

  const task = user?.contest.tasks.find((t) => t.name === taskName);
  if (user && !task) return notFound();

  return (
    <div className="flex grow flex-col gap-4">
      {task ? (
        <h1 className="text-center text-3xl font-bold">{task.title}</h1>
      ) : (
        <div className="skeleton mx-auto my-1 h-7 w-full max-w-xs" />
      )}
      <Tabs>
        <Tab page="">
          <Trans>Testo</Trans>
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
      href={`/task/terry/${taskName}/${page}`}
      prefetch>
      {children}
    </Link>
  );
}
