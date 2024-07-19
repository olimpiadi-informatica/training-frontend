"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useState } from "react";

import { type User, getUser } from "@olinfo/training-api";
import { Medal } from "lucide-react";
import useSWR, { SWRConfig } from "swr";

import { Table } from "~/components/table";
import { Badge, algobadge, badgeStroke, useUserBadges } from "~/lib/algobadge";

import { Summary } from "./summary";

export default function Page() {
  const [users, setUsers] = useState<string>();

  useEffect(() => {
    if (users === undefined) {
      setUsers(localStorage.getItem("algobadge-bulk") ?? "");
    }
  }, [users]);

  useEffect(() => {
    if (users !== undefined) {
      localStorage.setItem("algobadge-bulk", users);
    }
  }, [users]);

  const parsedUsers = users?.split(/\s+/).filter(Boolean) ?? [];

  return (
    <div
      className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 pb-4"
      style={{ "--cols": Object.keys(algobadge).length } as CSSProperties}>
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Inserisci gli username"
        rows={8}
        value={users ?? ""}
        onChange={(e) => setUsers(e.target.value)}
        // biome-ignore lint/a11y/noAutofocus: this is mostly an internal page, so a11y is not a priority
        autoFocus
      />
      <SWRConfig
        value={{
          onError: () => {},
          revalidateIfStale: false,
          revalidateOnFocus: false,
          shouldRetryOnError: false,
        }}>
        <Summary usernames={parsedUsers} />
        <Table
          data={parsedUsers}
          header={TableHeaders}
          row={TableRow}
          className="grid-cols-[1fr_5rem_repeat(var(--cols),3rem)]"
        />
      </SWRConfig>
    </div>
  );
}

function TableHeaders() {
  return (
    <>
      <div>Username</div>
      <div>totale</div>
      {Object.keys(algobadge).map((id) => (
        <div key={id}>{id}</div>
      ))}
    </>
  );
}

function TableRow({ item: username }: { item: string }) {
  const { badges, totalBadge, isLoading } = useUserBadges(username, true);

  const { data: user } = useSWR<User, Error, [string, string]>(
    ["api/user", username],
    ([, username]) => getUser(username),
    { revalidateIfStale: false },
  );

  return (
    <>
      <div className="min-w-64 text-wrap text-left">
        <Link
          href={user ? `/algobadge?impersonate=${encodeURIComponent(username)}&unlock=1` : ""}
          className="link text-blue-600 dark:text-blue-400">
          {username}
        </Link>
        {!isLoading &&
          (user ? (
            <span className="text-sm text-base-content/80">
              {" "}
              ({user?.first_name} {user?.last_name})
            </span>
          ) : (
            <span className="text-sm text-error"> (username non valido)</span>
          ))}
      </div>
      <div className="mx-auto">
        <Medal className={badgeStroke[totalBadge]} />
      </div>
      {Object.entries(badges ?? {}).map(([id, badge]) => (
        <Link
          key={id}
          href={user ? `/algobadge/${id}?impersonate=${encodeURIComponent(username)}&unlock=1` : ""}
          className="mx-auto">
          {isLoading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <Medal className={badgeStroke[badge.badge ?? Badge.None]} />
          )}
        </Link>
      ))}
    </>
  );
}
