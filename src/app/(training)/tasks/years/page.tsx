"use client";

import Link from "next/link";
import { useMemo } from "react";

import { Trans } from "@lingui/macro";
import { Menu } from "@olinfo/react-components";
import { getEventTags } from "@olinfo/training-api";
import useSWR from "swr";

import { H1 } from "~/components/header";

import { Skeleton } from "./skeleton";

export default function Page() {
  const { data: tags } = useSWR("api/event-tags", getEventTags, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  const years = useMemo(
    () =>
      tags
        ?.map((tag) => tag.match(/^ioi(\d{4})$/))
        .filter(Boolean)
        .map((match) => +match![1])
        .sort((a, b) => b - a),
    [tags],
  );

  if (!years) return <Skeleton />;

  return (
    <>
      <H1 className="mb-2">
        <Trans>Problemi per anno</Trans>
      </H1>
      <Menu>
        {years.map((year) => (
          <li key={year}>
            <Link href={`/tasks/1?tag=ioi${year}`}>
              <Trans>
                Olimpiadi di Informatica {year - 2}/{((year - 1) % 100).toString().padStart(2, "0")}
              </Trans>
            </Link>
          </li>
        ))}
      </Menu>
    </>
  );
}
