import { Menu } from "@olinfo/react-components";
import clsx from "clsx";
import { range, sortBy } from "lodash-es";
import { X } from "lucide-react";

import { H1 } from "~/components/header";

type Props = {
  page: number;
  pageSize: number;
  tags?: string[];
};

export function Skeleton({ page, pageSize, tags }: Props) {
  const widths = ["w-2/12", "w-3/12", "w-4/12", "w-5/12", "w-6/12", "w-7/12", "w-8/12"];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <H1 className="px-2">Pagina {page}</H1>
        <form role="search" className="join">
          <input
            className="input join-item input-bordered"
            name="task"
            type="search"
            placeholder="Nome del problema"
            aria-label="Nome del problema"
            disabled
          />
          <select className="join-item select select-bordered" aria-label="Ordinamento" disabled>
            <option value="">Più recenti</option>
            <option value="easiest">Più facili</option>
            <option value="hardest">Più difficili</option>
          </select>
        </form>
      </div>
      {tags?.length ? (
        <div className="flex flex-wrap gap-2">
          {sortBy(tags).map((tag) => (
            <div key={tag} className="badge badge-neutral flex h-6 gap-1">
              <X size={14} />
              {tag}
            </div>
          ))}
        </div>
      ) : null}
      <Menu>
        {range(pageSize).map((i) => (
          <li key={i}>
            <div>
              <div className="flex items-center">
                {range(5).map((i) => (
                  <div key={i} className="mask mask-star mr-0.5 size-4 bg-base-content/60" />
                ))}
              </div>
              <div className={clsx("skeleton h-5", widths[(3 * i) % widths.length])} />
            </div>
          </li>
        ))}
      </Menu>
    </div>
  );
}
