import React from "react";

import { H3 } from "~/components/header";

export function Skeleton() {
  return (
    <div>
      <div className="skeleton mx-auto my-1 h-5 w-64 text-center" />
      <H3 className="mb-2 mt-7">Dettagli</H3>
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
