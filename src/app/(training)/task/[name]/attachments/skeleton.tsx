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
        <Trans>Allegati</Trans>
      </H2>
      <Menu>
        {range(9).map((i) => (
          <li key={i}>
            <div className="block">
              <div className={clsx("skeleton my-0.5 h-4", widths[(3 * i) % widths.length])} />
            </div>
          </li>
        ))}
      </Menu>
    </div>
  );
}
