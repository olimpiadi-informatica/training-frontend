import { Trans } from "@lingui/macro";
import { Menu } from "@olinfo/react-components";
import { range } from "lodash-es";

import { H2 } from "~/components/header";

export function Skeleton() {
  return (
    <div>
      <H2 className="mb-2">
        <Trans>Sottoposizioni</Trans>
      </H2>
      <Menu className="grid min-w-fit grid-cols-[auto_auto_1fr_auto]">
        <h3 className="menu-title col-span-4 grid grid-cols-subgrid gap-2">
          <div>
            <Trans>ID</Trans>
          </div>
          <div>
            <Trans>Linguaggio</Trans>
          </div>
          <div>
            <Trans>Data e ora</Trans>
          </div>
          <div className="text-end">
            <Trans>Esito</Trans>
          </div>
        </h3>
        {range(10).map((i) => (
          <li key={i} className="col-span-4 grid grid-cols-subgrid">
            <div className="col-span-4 grid grid-cols-subgrid">
              <div className="w-20">
                <div className="skeleton my-0.5 h-4 w-16" />
              </div>
              <div className="skeleton my-0.5 h-4 w-10" />
              <div className="skeleton my-0.5 h-4 w-32" />
              <div className="skeleton h-5 w-10 rounded-lg px-2" />
            </div>
          </li>
        ))}
      </Menu>
    </div>
  );
}
