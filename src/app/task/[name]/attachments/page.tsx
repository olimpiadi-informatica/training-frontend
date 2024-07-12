"use client";

import Link from "next/link";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Menu } from "@olinfo/react-components";
import { type Task, fileUrl, getTask } from "@olinfo/training-api";
import { sortBy } from "lodash-es";
import useSWR from "swr";

import { H2 } from "~/components/header";

import { Skeleton } from "./skeleton";

type Props = {
  params: { name: string };
};

export default function Page({ params }: Props) {
  const { _ } = useLingui();

  const { data: task } = useSWR<Task, Error, [string, string]>(
    ["api/task", params.name],
    ([, ...params]) => getTask(...params),
    { revalidateIfStale: false },
  );

  if (!task) return <Skeleton />;

  const attachments = sortBy(task.attachments, "name");

  return (
    <div>
      <H2 className="mb-2">
        <Trans>Allegati</Trans>
      </H2>
      <Menu fallback={_(msg`Nessun allegato`)}>
        {attachments.map((att) => (
          <li key={att.name}>
            <Link href={fileUrl(att)} download>
              {att.name}
            </Link>
          </li>
        ))}
      </Menu>
    </div>
  );
}
