import React from "react";

import { Trans } from "@lingui/macro";
import { Menu } from "@olinfo/react-components";
import clsx from "clsx";
import { range } from "lodash-es";

import { H2 } from "~/components/header";

export function Skeleton() {
  const widths = ["w-2/12", "w-3/12", "w-4/12", "w-5/12", "w-6/12", "w-7/12", "w-8/12"];

  return (
    <div>
      <H2 className="mb-2">
        <Trans>Statistiche generali</Trans>
      </H2>
      <ul className="w-full rounded-box bg-base-200 p-2 *:p-2">
        <li>
          <span className="font-bold">
            <Trans>Utenti che l&apos;hanno provato:</Trans>
          </span>
          <span className="skeleton ml-2 inline-block h-4 w-12 align-text-bottom" />
        </li>
        <li>
          <span className="font-bold">
            <Trans>Utenti che l&apos;hanno risolto:</Trans>
          </span>
          <span className="skeleton ml-2 inline-block h-4 w-12 align-text-bottom" />
        </li>
        <li>
          <span className="font-bold">
            <Trans>Soluzioni inviate:</Trans>
          </span>
          <span className="skeleton ml-2 inline-block h-4 w-12 align-text-bottom" />
        </li>
        <li>
          <span className="font-bold">
            <Trans>Soluzioni corrette:</Trans>
          </span>
          <span className="skeleton ml-2 inline-block h-4 w-12 align-text-bottom" />
        </li>
      </ul>
      <H2 className="mb-2 mt-8">
        <Trans>Soluzione più veloci</Trans>
      </H2>
      <Menu>
        {range(10).map((i) => (
          <li key={i}>
            <div className="flex justify-between">
              <div className="flex grow">
                <div className="w-8">{i + 1}</div>{" "}
                <div className="max-w-sm grow">
                  <div className={clsx("skeleton h-4", widths[(3 * i) % widths.length])} />
                </div>
              </div>
              <div className="skeleton h-4 w-12 font-mono" />
            </div>
          </li>
        ))}
      </Menu>
    </div>
  );
}
