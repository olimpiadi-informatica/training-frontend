"use client";

import { Baloo_2 } from "next/font/google";
import type { ReactNode } from "react";

import clsx from "clsx";
import { Gem, Medal } from "lucide-react";

import { Badge, badgeColor } from "~/lib/algobadge";

const titleFont = Baloo_2({ weight: ["400", "500"], subsets: ["latin"], display: "swap" });

export function Title({ badge, children }: { badge: Badge; children?: ReactNode }) {
  const color = (threshold: Badge) =>
    badge >= threshold ? clsx(badgeColor[threshold], "font-bold") : undefined;

  const bronze = color(Badge.Bronze);
  const silver = color(Badge.Silver);
  const gold = color(Badge.Gold);
  const diamond = color(Badge.Diamond);

  return (
    <div className={clsx("max-xs:text-lg text-3xl xs:-translate-y-1", titleFont.className)}>
      <span className={clsx("max-xs:text-2xl text-4xl", silver)}>A</span>
      LG
      <span className={gold}>O</span>
      <span className={clsx("max-xs:text-2xl text-4xl", bronze)}>B</span>A
      <span className={diamond}>D</span>
      GE
      {badge >= Badge.Bronze && badge < Badge.Diamond && (
        <Medal
          size={32}
          strokeWidth={2.5}
          className={clsx(
            "ml-2 inline-block align-sub last:*:hidden max-sm:hidden",
            bronze,
            silver,
            gold,
          )}
        />
      )}
      {badge === Badge.Diamond && (
        <Gem
          size={32}
          strokeWidth={2.5}
          className={clsx("ml-2 inline-block align-sub max-sm:hidden", diamond)}
        />
      )}
      {children}
    </div>
  );
}
