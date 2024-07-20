import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

import { Layout } from "@olinfo/react-components";
import { getMeSync } from "@olinfo/training-api";

import { loadLocale } from "~/lib/locale";

import { Routing } from "./routing";
import "./globals.css";
import { LayoutClient } from "./layout-client";

export const metadata: Metadata = {
  title: "Allenamento Olimpiadi Italiane di Informatica",
  description: "Piattaforma di allenamento delle Olimpiadi Italiane di Informatica",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e7e2df" },
    { media: "(prefers-color-scheme: dark)", color: "#151a1f" },
  ],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const i18n = await loadLocale();

  const token = cookies().get("training_token");
  const user = token && getMeSync(token.value);

  return (
    <html lang={i18n.locale}>
      <body>
        <Layout>
          <LayoutClient syncUser={user} locale={i18n.locale} messages={i18n.messages}>
            {children}
          </LayoutClient>
        </Layout>
        <Routing />
      </body>
    </html>
  );
}
