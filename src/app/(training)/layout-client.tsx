"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { ReactNode } from "react";

import { type Contest, type SyncUser, type User, getContest, getMe } from "@olinfo/training-api";
import useSWR from "swr";

import { UserProvider } from "~/components/user";

import { Navbar } from "./navbar";

type LayoutProps = {
  syncUser: SyncUser | undefined;
  children: ReactNode;
};

export function LayoutClient({ syncUser, children }: LayoutProps) {
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
      {children}
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
