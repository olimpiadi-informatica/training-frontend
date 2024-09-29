import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Navbar } from "./navbar";

export const metadata: Metadata = {
  title: "AlgoBadge",
  description:
    "AlgoBadge è un percorso di allenamento che ti consentirà di apprendere gli algoritmi e le tecniche essenziali per affrontare le fase Nazione delle Olimpiadi di Informatica",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="relative mx-auto w-full max-w-screen-xl p-4 pb-8">{children}</div>
    </>
  );
}
