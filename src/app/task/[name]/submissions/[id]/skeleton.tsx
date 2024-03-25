import React from "react";

import { H2, H3 } from "~/components/header";

export function Skeleton({ id }: { id: string }) {
  return (
    <div>
      <H2>Sottoposizione {id}</H2>
      <H3 className="mb-2 mt-6">Dettagli</H3>
      <ul className="w-full rounded-box bg-base-200 p-2 *:p-2">
        <li>
          <span className="font-bold">Esito:</span>
          <span className="skeleton ml-2 inline-block h-4 w-16 align-text-bottom" />
        </li>
        <li>
          <span className="font-bold">Linguaggio:</span>
          <span className="skeleton ml-2 inline-block h-4 w-24 align-text-bottom" />
        </li>
        <li>
          <span className="font-bold">Data e ora:</span>
          <span className="skeleton ml-2 inline-block h-4 w-36 align-text-bottom" />
        </li>
      </ul>
    </div>
  );
}
