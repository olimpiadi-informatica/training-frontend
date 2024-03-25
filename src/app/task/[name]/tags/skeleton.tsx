import { Menu } from "@olinfo/react-components";
import clsx from "clsx";
import { range } from "lodash-es";

import { H2 } from "~/components/header";

export function Skeleton() {
  const widths = ["w-2/12", "w-1/12", "w-3/12"];

  return (
    <div>
      <H2 className="mb-2">Tag</H2>
      <Menu>
        {range(3).map((i) => (
          <li key={i}>
            <div className="block">
              <div className={clsx("skeleton my-0.5 h-4", widths[i])} />
            </div>
          </li>
        ))}
      </Menu>
    </div>
  );
}
