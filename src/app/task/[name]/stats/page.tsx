"use client";

import Link from "next/link";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Menu } from "@olinfo/react-components";
import { type TaskStats, getTaskStats } from "@olinfo/training-api";
import useSWR from "swr";

import { H2 } from "~/components/header";

import { Skeleton } from "./skeleton";

type Props = {
  params: { name: string };
};

export default function Page({ params: { name: taskName } }: Props) {
  const { _ } = useLingui();

  const { data: stats } = useSWR<TaskStats, Error, [string, string]>(
    ["api/stats", taskName],
    ([, ...params]) => getTaskStats(...params),
  );

  if (!stats) return <Skeleton />;

  return (
    <div>
      <H2 className="mb-2">
        <Trans>Statistiche generali</Trans>
      </H2>
      <ul className="w-full rounded-box bg-base-200 p-2 *:p-2">
        <li>
          <span className="font-bold">
            <Trans>Utenti che l&apos;hanno provato:</Trans>
          </span>{" "}
          {stats.nusers}
        </li>
        <li>
          <span className="font-bold">
            <Trans>Utenti che l&apos;hanno risolto:</Trans>
          </span>{" "}
          {stats.nuserscorrect}{" "}
          {stats.nusers && (
            <span className="text-sm text-base-content/80">
              ({Math.round((stats.nuserscorrect / stats.nusers) * 100)}%)
            </span>
          )}
        </li>
        <li>
          <span className="font-bold">
            <Trans>Soluzioni inviate:</Trans>
          </span>{" "}
          {stats.nsubs}
        </li>
        <li>
          <span className="font-bold">
            <Trans>Soluzioni corrette:</Trans>
          </span>{" "}
          {stats.nsubscorrect}{" "}
          {stats.nsubs && (
            <span className="text-sm text-base-content/80">
              ({Math.round((stats.nsubscorrect / stats.nsubs) * 100)}%)
            </span>
          )}
        </li>
      </ul>
      <H2 className="mb-2 mt-8">
        <Trans>Soluzione più veloci</Trans>
      </H2>
      <Menu fallback={_(msg`Nessuna soluzione`)}>
        {stats.best.map((user, i) => (
          <li key={user.username}>
            <Link href={`/user/${user.username}`} className="flex justify-between">
              <div>
                <span className="inline-block w-8">{i + 1}</span> {user.username}
              </div>
              <div className="font-mono">{user.time.toFixed(3)}</div>
            </Link>
          </li>
        ))}
      </Menu>
    </div>
  );
}
