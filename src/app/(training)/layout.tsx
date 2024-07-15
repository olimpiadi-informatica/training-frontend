import type { ReactNode } from "react";

import { loadLocale } from "~/lib/locale";

import { Navbar } from "./navbar";

export default async function Layout({ children }: { children: ReactNode }) {
  await loadLocale();

  return (
    <>
      <Navbar />
      <div className="mx-auto flex w-full max-w-screen-xl grow flex-col p-4 pb-8">{children}</div>
    </>
  );
}
