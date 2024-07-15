import Link from "next/link";

import clsx from "clsx";
import { Gem, LockKeyholeOpen, type LucideIcon, Medal } from "lucide-react";

import {
  Badge,
  type Category,
  type CategoryBadge,
  badgeStroke,
  bronzeScore,
  diamondScore,
  goldScore,
  silverScore,
  unlockScore,
} from "~/lib/algobadge";

import style from "./header.module.css";

export function Header({ category, badge }: { category: Category; badge?: CategoryBadge }) {
  const maxScore = badge?.maxScore ?? 0;
  const score = badge?.badge === Badge.Locked ? 0 : badge?.score ?? 0;

  const needed = [bronzeScore, silverScore, goldScore, diamondScore]
    .map((threshold) => threshold * maxScore - score)
    .filter((value) => value > 0)[0];

  return (
    <>
      <h1>{category.title}</h1>
      <div className="flex justify-center gap-4 px-4 pb-8">
        {category.tasks.map((task) => {
          const url = task.terry ? `/task/terry/${task.name}` : `/task/${task.name}`;
          const score = badge?.tasks?.[task.name];
          const roundedScore = Math.round((score ?? 0) * 10) / 10;
          const maxScore = task.maxScore ?? 100;

          return (
            <Link
              key={task.name}
              href={url}
              className={clsx(
                "btn btn-lg relative h-auto overflow-hidden pb-3 pt-2 dark:btn-neutral",
                roundedScore === maxScore && "!btn-success",
              )}>
              <div className="*:mb-1">
                <div className="text-xl">{task.name}</div>
                <div className={clsx(score === undefined && "invisible")}>
                  {roundedScore} / {maxScore}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mx-4">
        <div
          className="h-6 w-full tooltip tooltip-bottom"
          data-tip={
            needed === undefined
              ? "Hai raggiunto il badge di diamante!"
              : `Ti mancano ${needed} punti al badge successivo!`
          }>
          <div className="size-full overflow-hidden rounded-full bg-base-content/20">
            {badge && (
              <div
                className={clsx("h-full min-w-4", progress(badge.badge))}
                style={{ width: `${(score / maxScore) * 100}%` }}
              />
            )}
          </div>
        </div>
        <div className="relative mt-4 h-8 w-full">
          <Threshold
            color="stroke-base-content"
            score={unlockScore}
            icon={LockKeyholeOpen}
            size={32}
          />
          <Threshold color={badgeStroke[Badge.Bronze]} score={bronzeScore} />
          <Threshold color={badgeStroke[Badge.Silver]} score={silverScore} />
          <Threshold color={badgeStroke[Badge.Gold]} score={goldScore} />
          <Threshold color={badgeStroke[Badge.Diamond]} score={diamondScore} icon={Gem} />
        </div>
      </div>
      <hr />
    </>
  );
}

function progress(badge: Badge) {
  switch (badge) {
    case Badge.Bronze:
      return style.progressBronze;
    case Badge.Silver:
      return style.progressSilver;
    case Badge.Gold:
      return style.progressGold;
    case Badge.Diamond:
      return style.progressDiamond;
    default:
      return style.progressDefault;
  }
}

type ThresholdProps = {
  color: `stroke-${string}`;
  score: number;
  icon?: LucideIcon;
  size?: number;
};

function Threshold({ color, score, icon, size }: ThresholdProps) {
  const Icon = icon ?? Medal;
  return (
    <Icon
      className={clsx(
        "absolute -translate-x-1/2 last:-translate-x-full",
        color,
        Icon === Medal && "last:*:hidden",
      )}
      size={size ?? 36}
      style={{ left: `${score * 100}%` }}
    />
  );
}
