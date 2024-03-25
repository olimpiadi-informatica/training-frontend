import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ReactNode } from "react";

import { Layout } from "@olinfo/react-components";
import { getMeSync } from "@olinfo/training-api";

import "./globals.css";
import { LayoutClient } from "./layout-client";
import { Routing } from "./routing";

export const metadata: Metadata = {
  title: "Allenamento Olimpiadi Italiane di Informatica",
  description: "Piattaforma di allenamento delle Olimpiadi Italiane di Informatica",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const token = cookies().get("training_token");
  const user = token && getMeSync(token.value);

  return (
    <html lang="it">
      <head>
        <meta name="theme-color" content="#e7e2df" />
        <meta name="theme-color" content="#15191e" media="(prefers-color-scheme: dark)" />
      </head>
      <body>
        <Layout>
          <LayoutClient syncUser={user}>{children}</LayoutClient>
        </Layout>
        <Routing />
      </body>
    </html>
  );
}
