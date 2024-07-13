import { Fragment } from "react";

import { Check, LockKeyhole, PencilLine } from "lucide-react";

export function Algobadge({ className }: { className?: string }) {
  const path = [
    "M2,0.4",
    "L2,0.5   Q2,0.75   1.5,0.75", // ⤶
    "L1,0.75  Q0.5,0.75 0.5,1", // ⤹
    "L0.5,2   Q0.5,2.25 1,2.25", // ⤷
    "L2,2.25  Q2.5,2.25 2.5,2.5", // ⤵
    "L2.5,3.5 Q2.5,3.75 2,3.75", // ⤶
    "L1,3.75  Q0.5,3.75 0.5,4", // ⤹
    "L0.5,5   Q0.5,5.25 1,5.25", // ⤷
    "         Q2,5.25   2,5.5", // ⤵
    "L2,5.7 M2,5.9 L2,6.1 M2,6.3 L2,6.5", // ⇣
  ];

  const nodes = [
    [2, 0, "check"],
    [0.5, 1.5, "check"],
    [2.5, 3, "pencil"],
    [0.5, 4.5, "lock"],
  ] as const;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -0.5 3 7"
      className={className}
      aria-hidden="true">
      <path d={path.join("")} strokeWidth={0.05} className="stroke-base-content" fillOpacity={0} />
      {nodes.map(([cx, cy, icon], i) => (
        <Fragment key={i}>
          <circle
            cx={cx}
            cy={cy}
            r={0.4}
            strokeWidth={0.05}
            className="fill-base-200 stroke-base-content"
          />
          {icon === "check" && <Check x={cx - 0.25} y={cy - 0.25} size={0.5} />}
          {icon === "pencil" && <PencilLine x={cx - 0.2} y={cy - 0.2} size={0.4} />}
          {icon === "lock" && <LockKeyhole x={cx - 0.2} y={cy - 0.2} size={0.4} />}
        </Fragment>
      ))}
    </svg>
  );
}
