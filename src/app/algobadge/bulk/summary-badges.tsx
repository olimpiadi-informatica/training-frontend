import { useMemo } from "react";

import { omitBy, pull, range } from "lodash-es";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge, algobadge } from "~/lib/algobadge";

import { type Users, badgeColor, badgeName } from "./common";
import { TooltipContent } from "./tooltip";

type DataEntry = { name: Badge; fill: string; [count: string]: any };
type Data = DataEntry[];

const filteredBadges = [Badge.Bronze, Badge.Silver, Badge.Gold, Badge.Diamond];

export function SummaryBadges({ users }: { users: Users }) {
  const numCategories = Object.keys(algobadge).length;

  const data = useMemo((): Data => {
    const badges = Object.fromEntries(
      filteredBadges.map((badge) => [
        badge,
        {
          name: badge,
          fill: badgeColor[badge],
          ...Object.fromEntries(range(numCategories + 1).map((i) => [i, 0])),
        } as DataEntry,
      ]),
    );

    for (const user of Object.values(users)) {
      if (!user) continue;

      const count = Object.fromEntries(filteredBadges.map((badge) => [badge, 0]));
      for (const value of Object.values(user)) {
        for (const badge of Object.keys(count)) {
          if (value.badge >= Number(badge)) {
            count[badge] += 1;
          }
        }
      }
      for (const [badge, value] of Object.entries(count)) {
        badges[badge][value] += 1;
      }
    }

    return Object.values(badges).map(
      (badges) => omitBy(badges, (value) => value === 0) as DataEntry,
    );
  }, [users, numCategories]);

  return (
    <ResponsiveContainer height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tickFormatter={(badge) => badgeName[badge as Badge]}
        />
        <YAxis tickLine={false} axisLine={false} />
        <CartesianGrid vertical={false} stroke="oklch(var(--bc) / 0.1)" />
        <Tooltip
          cursor={{ fill: "oklch(var(--bc) / 0.1)" }}
          content={TooltipContent}
          formatter={(value, i) => [value, `${i} badge`]}
        />
        {range(numCategories + 1).map((i) => (
          <Bar
            key={i}
            dataKey={i}
            stackId="1"
            fillOpacity={i === numCategories ? 1 : (i / numCategories) * 0.6 + 0.2}>
            {data.map((item) => {
              const itemKeys = pull(Object.keys(item), "name", "fill");
              const pos = itemKeys.indexOf(i.toString());

              const radius = [0, 0, 0, 0];
              if (pos === 0) {
                radius[2] = radius[3] = 8;
              }
              if (pos === itemKeys.length - 1) {
                radius[0] = radius[1] = 8;
              }

              return (
                <Cell
                  key={item.name}
                  stroke={badgeColor[item.name as Badge]}
                  fill={badgeColor[item.name as Badge]}
                  radius={radius as any}
                />
              );
            })}
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
