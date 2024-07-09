import { Trans } from "@lingui/macro";
import { Menu } from "@olinfo/react-components";
import clsx from "clsx";
import { range } from "lodash-es";
import { SquarePlus } from "lucide-react";

import { H2 } from "~/components/header";

export function Skeleton({ isTagsPage }: { isTagsPage: boolean }) {
  const widths = ["w-2/12", "w-1/12", "w-3/12"];

  return (
    <div>
      <H2 className="mb-2">
        <Trans>Tags</Trans>
      </H2>
      <Menu>
        {range(3).map((i) => (
          <li key={i}>
            <div className="block">
              <div className={clsx("skeleton my-0.5 h-4", widths[i])} />
            </div>
          </li>
        ))}
      </Menu>
      {isTagsPage && (
        <div className="mt-4 flex justify-center">
          <button className="btn btn-primary" disabled>
            <SquarePlus size={22} /> <Trans>Aggiungi tag</Trans>
          </button>
        </div>
      )}
    </div>
  );
}
