"use client";

import Link from "next/link";
import { useParams, useRouter, useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";

import { Tabs } from "@olinfo/react-components";
import clsx from "clsx";

import { H1 } from "~/components/header";
import { useUser } from "~/components/user";

type Props = {
  params: { username: string };
  children: ReactNode;
};

export default function Layout({ params: { username }, children }: Props) {
  const router = useRouter();
  const me = useUser();

  if (!me) {
    router.push(`/login?redirect=${encodeURIComponent(`/user/${username}/edit`)}`);
    return "Reindirizzamento...";
  }
  if (me.username !== username) {
    router.replace(`/user/${me.username}/edit`);
    return "Reindirizzamento...";
  }

  return (
    <div className="flex flex-col gap-4">
      <H1>Modifica profilo</H1>
      <Tabs>
        <Tab page="password">Password</Tab>
        <Tab page="email">Email</Tab>
        <Tab page="avatar">Foto</Tab>
        {/*
          TODO: replace user.institute_id with user.social_user.institute_id here
                https://github.com/algorithm-ninja/cmsocial/blob/master/cmsocial/server/pws.py#L829
        */}
        {/* <Tab page="school">Scuola</Tab> */}
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
  const selectedPage = useSelectedLayoutSegment();
  const { username } = useParams();

  return (
    <Link
      role="tab"
      className={clsx("tab", selectedPage === page && "tab-active")}
      href={`/user/${username}/edit/${page}`}
      prefetch>
      {children}
    </Link>
  );
}
