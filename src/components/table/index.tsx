import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import clsx from "clsx";

import style from "./table.module.css";

export type TableProps<T> = {
  data: T[];
  header: ComponentType<{ context?: never }>;
  row: ComponentType<{ item: T }>;
  className?: string;
};

const LargeTable = dynamic(() => import("./table-large"), { ssr: false });

function SmallTable<T>({ data, header: Header, row: Row, className }: TableProps<T>) {
  return (
    <div className={style.outerContainer}>
      <div className={clsx(style.innerContainer, "w-min")}>
        <div className={clsx(style.scroller, "w-min", className)}>
          <div className="w-min">
            <div>
              <Header />
            </div>
            <div className={style.list}>
              {data.map((item, i) => (
                <div key={i} className={style.item}>
                  <Row item={item} />
                </div>
              ))}
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Table<T>(props: TableProps<T>) {
  return props.data.length >= 20 ? (
    <LargeTable {...(props as TableProps<any>)} />
  ) : (
    <SmallTable<T> {...props} />
  );
}
