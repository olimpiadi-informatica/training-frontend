import React from "react";

import { Trans } from "@lingui/macro";

import { H2, H3 } from "~/components/header";

export function Skeleton(props: { id: string }) {
  return (
    <div>
      <H2>
        <Trans>Sottoposizione {props.id}</Trans>
      </H2>
      <H3 className="mb-2 mt-6">
        <Trans>Dettagli</Trans>
      </H3>
      <ul className="w-full rounded-box bg-base-200 p-2 *:p-2">
        <li>
          <span className="font-bold">
            <Trans>Esito:</Trans>
          </span>
          <span className="skeleton ml-2 inline-block h-4 w-16 align-text-bottom" />
        </li>
        <li>
          <span className="font-bold">
            <Trans>Linguaggio:</Trans>
          </span>
          <span className="skeleton ml-2 inline-block h-4 w-24 align-text-bottom" />
        </li>
        <li>
          <span className="font-bold">
            <Trans>Data e ora:</Trans>
          </span>
          <span className="skeleton ml-2 inline-block h-4 w-36 align-text-bottom" />
        </li>
      </ul>
    </div>
  );
}
