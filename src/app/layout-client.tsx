"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { type ReactNode, useMemo } from "react";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useNotifications } from "@olinfo/react-components";
import { type Contest, type SyncUser, type User, getContest, getMe } from "@olinfo/training-api";
import useSWR, { SWRConfig } from "swr";

import { UserProvider } from "~/components/user";

import { Navbar } from "./navbar";

type LayoutProps = {
  syncUser: SyncUser | undefined;
  locale: string;
  messages: Messages;
  children: ReactNode;
};

export function LayoutClient({ syncUser, locale, messages, children }: LayoutProps) {
  const { notifyError } = useNotifications();

  const i18n = useMemo(() => {
    return setupI18n({
      locale,
      messages: { [locale]: messages },
    });
  }, [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <SWRConfig value={{ onError: notifyError }}>
        <LayoutClientInner syncUser={syncUser}>{children}</LayoutClientInner>
      </SWRConfig>
    </I18nProvider>
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
