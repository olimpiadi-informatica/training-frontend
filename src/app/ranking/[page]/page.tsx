"use client";

import Link from "next/link";
import { notFound } from "next/navigation";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Avatar, Menu } from "@olinfo/react-components";
import { Ranking, User, getRanking } from "@olinfo/training-api";
import useSWR from "swr";

import { H1 } from "~/components/header";
import { Pagination } from "~/components/pagination";

import { Skeleton } from "./skeleton";

type Props = {
  params: { page: string };
};

export default function Page({ params: { page: pageStr } }: Props) {
  const page = Number(pageStr);
  const pageSize = 20;

  if (!Number.isInteger(page) || page < 1) notFound();

  const { _ } = useLingui();

  const { data: ranking } = useSWR<Ranking, Error, [string, number, number]>(
    ["api/ranking", page, pageSize],
    ([, ...params]) => getRanking(...params),
  );

  if (!ranking) return <Skeleton page={page} pageSize={pageSize} />;

  const { users, num } = ranking;
  const pageCount = Math.max(Math.ceil(num / pageSize), 1);
  if (page > pageCount) notFound();

  return (
    <div className="flex flex-col gap-4">
      <H1 className="px-2">
        <Trans>Pagina {page}</Trans>
      </H1>
      <Menu fallback={_(msg`Nessun utente trovato`)}>
        {users.map((user: User, i) => (
          <li key={user.username}>
            <Link href={`/user/${user.username}`} className="flex justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="min-w-8">{i + (page - 1) * pageSize + 1}</div>
                <Avatar user={user} size={32} />
                <div>{user.username}</div>
                <div className="text-base-content/60 max-sm:hidden">
                  ({user.first_name} {user.last_name})
                </div>
              </div>
              <div className="font-mono">{user.score}</div>
            </Link>
          </li>
        ))}
      </Menu>
      <Pagination page={page} pageCount={pageCount} />
    </div>
  );
}
