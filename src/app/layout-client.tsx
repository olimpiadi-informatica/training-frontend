"use client";

import { type ReactNode, useMemo } from "react";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useNotifications } from "@olinfo/react-components";
import { SWRConfig } from "swr";

type LayoutProps = {
  locale: string;
  messages: Messages;
  children: ReactNode;
};

export function LayoutClient({ locale, messages, children }: LayoutProps) {
  const { notifyError } = useNotifications();

  const i18n = useMemo(() => {
    return setupI18n({
      locale,
      messages: { [locale]: messages },
    });
  }, [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <SWRConfig value={{ onError: notifyError }}>{children}</SWRConfig>
    </I18nProvider>
  );
}
