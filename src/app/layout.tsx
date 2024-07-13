import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Layout } from "@olinfo/react-components";

import { loadLocale } from "~/lib/locale";

import { Routing } from "./routing";
import "./globals.css";
import { LayoutClient } from "./layout-client";

export const metadata: Metadata = {
  title: "Allenamento Olimpiadi Italiane di Informatica",
  description: "Piattaforma di allenamento delle Olimpiadi Italiane di Informatica",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const i18n = await loadLocale();

  return (
    <html lang={i18n.locale}>
      <head>
        <meta name="theme-color" content="#e7e2df" />
        <meta name="theme-color" content="#15191e" media="(prefers-color-scheme: dark)" />
      </head>
      <body>
        <Layout>
          <LayoutClient locale={i18n.locale} messages={i18n.messages}>
            {children}
          </LayoutClient>
        </Layout>
        <Routing />
      </body>
    </html>
  );
}
