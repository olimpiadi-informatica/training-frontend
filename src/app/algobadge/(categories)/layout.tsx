"use client";

import { Trans } from "@lingui/macro";
import { useRouter, useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import type { ReactNode } from "react";

import { Badge, type CategoryId, algobadge, useMyBadges } from "~/lib/algobadge";

import { Fireworks } from "~/components/fireworks";
import { Header } from "./header";
import { Tree } from "./tree";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const page = useSelectedLayoutSegment() as CategoryId | null;
  const params = useSearchParams();
  const { badges, totalBadge, isLoading } = useMyBadges();

  if (!isLoading && !badges) {
    router.push(`/login?redirect=${encodeURIComponent(`/algobadge?${params}`)}`);
    return <Trans>Reindirizzamento...</Trans>;
  }

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
