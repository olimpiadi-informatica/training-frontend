import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { CSSProperties } from "react";

import clsx from "clsx";
import { LockKeyhole } from "lucide-react";

import {
  Badge,
  type CategoryBadge,
  type CategoryId,
  algobadge,
  badgeBackground,
  useMyBadges,
} from "~/lib/algobadge";

export function Tree() {
  return (
    <div className="relative">
      <div className="grid grid-cols-3 md:grid-cols-4">
        {Object.keys(algobadge).map((id) => (
          <TreeNode key={id} categoryId={id as CategoryId} />
        ))}
      </div>
      <div className="absolute inset-0 -z-10 md:hidden">
        <svg
          viewBox="0.5 0.5 3 4"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          aria-hidden={true}>
          <TreeEdges transpose />
        </svg>
      </div>
      <div className="absolute inset-0 -z-10 max-md:hidden">
        <svg
          viewBox="0.5 0.5 4 3"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          aria-hidden={true}>
          <TreeEdges />
        </svg>
      </div>
    </div>
  );
}

function TreeNode({ categoryId }: { categoryId: CategoryId }) {
  const category = algobadge[categoryId];

  const { badges } = useMyBadges();
  const badge = badges?.[categoryId];

  const style = {
    "--row": category.position[1],
    "--col": category.position[0],
  } as CSSProperties;

  return (
    <div
      className={clsx(
        "col-[var(--row)] row-[var(--col)] p-4 md:col-[var(--col)] md:row-[var(--row)]",
        "*:size-20 *:xs:size-24 *:rounded-full *:border *:border-base-content/20 *:mx-auto",
      )}
      style={style}>
      {badge ? (
        badge.badge === Badge.Locked ? (
          <TreeNodeLocked />
        ) : (
          <TreeNodeUnlocked categoryId={categoryId} badge={badge} />
        )
      ) : (
        <div className="skeleton" />
      )}
    </div>
  );
}

function TreeNodeUnlocked({ categoryId, badge }: { categoryId: CategoryId; badge: CategoryBadge }) {
  const searchParams = useSearchParams();
  return (
    <Link
      href={`/algobadge/${categoryId}?${searchParams}`}
      className={clsx(
        "flex flex-col items-center justify-center text-neutral-900",
        badgeBackground[badge.badge],
      )}
      scroll={false}>
      <div className="font-mono text-lg xs:text-2xl">{categoryId}</div>
      <div className="max-xs:text-sm">
        {badge.score} / {badge.maxScore}
      </div>
    </Link>
  );
}

function TreeNodeLocked() {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-neutral-600",
        badgeBackground[Badge.Locked],
      )}>
      <LockKeyhole size={36} />
    </div>
  );
}

function TreeEdges({ transpose }: { transpose?: boolean }) {
  return Object.entries(algobadge).map(([id, node]) => {
    if (!node.parent) return;
    const parent = algobadge[node.parent];
    return (
      <line
        key={id}
        x1={node.position[transpose ? 1 : 0]}
        y1={node.position[transpose ? 0 : 1]}
        x2={parent.position[transpose ? 1 : 0]}
        y2={parent.position[transpose ? 0 : 1]}
        strokeWidth="0.025"
        className="stroke-base-content"
      />
    );
  });
}
