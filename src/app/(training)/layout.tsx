"use client";

import type { ReactNode } from "react";

import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";
import { Navbar } from "./navbar";

export default function Layout({ children }: { children: ReactNode }) {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <Navbar />
      <div
        className={clsx(
          "flex grow w-full flex-col",
          segment !== "(home)" && "mx-auto max-w-screen-xl p-4 pb-8",
        )}>
        {children}
      </div>
    </>
  );
}
