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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <H1 className="px-2">Pagina {page}</H1>
        <form role="search">
          <input
            className="input input-bordered"
            name="task"
            type="search"
            placeholder="Nome del problema"
            aria-label="Nome del problema"
            disabled
          />
        </form>
      </div>
      <Menu>
        {range(pageSize).map((i) => (
          <li key={i}>
            <div className="flex">
              <div className={clsx("skeleton h-5", widths[(3 * i) % widths.length])} />
            </div>
          </li>
        ))}
      </Menu>
    </div>
  );
}
