import { Trans } from "@lingui/macro";
import { Menu } from "@olinfo/react-components";
import { range } from "lodash-es";

import { H1 } from "~/components/header";

export function Skeleton() {
  const years = new Date().getFullYear() - 2003;

  return (
    <>
      <H1 className="mb-2">
        <Trans>Problemi per anno</Trans>
      </H1>
      <Menu>
        {range(years).map((i) => (
          <li key={i}>
            <div className="block">
              <div className="skeleton my-0.5 h-4 max-w-64" />
            </div>
          </li>
        ))}
      </Menu>
    </>
  );
}
