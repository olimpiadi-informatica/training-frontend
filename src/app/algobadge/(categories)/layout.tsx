"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import type { ReactNode } from "react";

import { Fireworks } from "~/components/fireworks";
import { Badge, type CategoryId, algobadge, useMyBadges } from "~/lib/algobadge";

import { Header } from "./header";
import { Tree } from "./tree";

export default function Layout({ children }: { children: ReactNode }) {
  const page = useSelectedLayoutSegment() as CategoryId | null;
  const { badges, totalBadge } = useMyBadges();

  return (
    <>
      <Tree />
      <div className="prose mt-8 max-w-full md:prose-lg">
        {page && <Header category={algobadge[page]} badge={badges?.[page]} />}
        <div className="[&_svg]:inline-block [&_svg]:align-text-top [&_svg]:me-1">{children}</div>
      </div>
      {totalBadge === Badge.Diamond && <Fireworks />}
    </>
  );
}
