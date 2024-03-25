import { Menu } from "@olinfo/react-components";
import clsx from "clsx";
import { range } from "lodash-es";

import { H1 } from "~/components/header";

type Props = {
  page: number;
  pageSize: number;
};

export function Skeleton({ page, pageSize }: Props) {
  const widths = ["w-2/12", "w-3/12", "w-4/12", "w-5/12", "w-6/12", "w-7/12", "w-8/12"];

  return (
    <div className="flex flex-col gap-4">
      <H1 className="px-2">Pagina {page}</H1>
      <Menu>
        {range(pageSize).map((i) => (
          <li key={i}>
            <div className="flex justify-between">
              <div className="flex grow items-center gap-2 sm:gap-4">
                <div className="min-w-8">{i + (page - 1) * pageSize + 1}</div>
                <div className="avatar">
                  <div className="skeleton size-8 rounded" />
                </div>
                <div className="max-w-sm grow">
                  <div className={clsx("skeleton h-5", widths[(3 * i) % widths.length])} />
                </div>
              </div>
              <div className="skeleton h-5 w-12" />
            </div>
          </li>
        ))}
      </Menu>
    </div>
  );
}
