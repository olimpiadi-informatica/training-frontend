"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { ReactNode } from "react";

import { useNotifications } from "@olinfo/react-components";
import { Contest, SyncUser, User, getContest, getMe } from "@olinfo/training-api";
import useSWR, { SWRConfig } from "swr";

import { UserProvider } from "~/components/user";

import { Navbar } from "./navbar";

type LayoutProps = {
  syncUser: SyncUser | undefined;
  children: ReactNode;
};

export function LayoutClient({ syncUser, children }: LayoutProps) {
  const { notifyError } = useNotifications();

  return (
    <SWRConfig value={{ onError: notifyError }}>
      <LayoutClientInner syncUser={syncUser}>{children}</LayoutClientInner>
    </SWRConfig>
  );
}

function LayoutClientInner({ syncUser, children }: { syncUser?: SyncUser; children: ReactNode }) {
  const { data: contest } = useSWR<Contest, Error>("api/contest", getContest, {
    revalidateIfStale: false,
  });

  const { data: asyncUser, isValidating } = useSWR<User | undefined>("api/me", userFetcher, {
    revalidateIfStale: false,
  });
  const user = isValidating ? syncUser : asyncUser;

  return (
    <UserProvider user={user}>
      {contest && <GoogleAnalytics gaId={contest.analytics} />}
      <Navbar />
      <div className="mx-auto flex w-full max-w-screen-xl grow flex-col p-4 pb-8">{children}</div>
    </UserProvider>
  );
}

async function userFetcher() {
  try {
    return await getMe();
  } catch (err) {
    if (err instanceof Error && err.message !== "Unauthorized") {
      throw err;
    }
  }
}
