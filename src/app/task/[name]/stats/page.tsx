"use client";

import Link from "next/link";

import { Menu } from "@olinfo/react-components";
import { TaskStats, getTaskStats } from "@olinfo/training-api";
import useSWR from "swr";

import { H2 } from "~/components/header";

import { Skeleton } from "./skeleton";

type Props = {
  params: { name: string };
};

export default function Page({ params: { name: taskName } }: Props) {
  const { data: stats } = useSWR<TaskStats, Error, [string, string]>(
    ["api/stats", taskName],
    ([, ...params]) => getTaskStats(...params),
  );

  if (!stats) return <Skeleton />;

  return (
    <div>
      <H2 className="mb-2">Statistiche generali</H2>
      <ul className="w-full rounded-box bg-base-200 p-2 *:p-2">
        <li>
          <span className="font-bold">Utenti che l&apos;hanno provato:</span> {stats.nusers}
        </li>
        <li>
          <span className="font-bold">Utenti che l&apos;hanno risolto:</span> {stats.nuserscorrect}{" "}
          {stats.nusers && (
            <span className="text-sm text-base-content/80">
              ({Math.round((stats.nuserscorrect / stats.nusers) * 100)}%)
            </span>
          )}
        </li>
        <li>
          <span className="font-bold">Soluzioni inviate:</span> {stats.nsubs}
        </li>
        <li>
          <span className="font-bold">Soluzioni corrette:</span> {stats.nsubscorrect}{" "}
          {stats.nsubs && (
            <span className="text-sm text-base-content/80">
              ({Math.round((stats.nsubscorrect / stats.nsubs) * 100)}%)
            </span>
          )}
        </li>
      </ul>
      <H2 className="mb-2 mt-8">Soluzione più veloci</H2>
      <Menu fallback="Nessuna soluzione">
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
