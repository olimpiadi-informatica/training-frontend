import { Card, CardBody } from "@olinfo/react-components";
import clsx from "clsx";
import { range } from "lodash-es";

import { H1 } from "~/components/header";

export function Skeleton({ username }: { username: string }) {
  const widths = ["w-6/12", "w-7/12", "w-8/12", "w-9/12", "w-10/12", "w-11/12", "w-full"];

  return (
    <div className="flex flex-col gap-4">
      <H1 className="sr-only">Profilo di {username}</H1>
      <Card>
        <div className="flex max-w-full justify-center pb-0 max-sm:p-4">
          <div className="skeleton size-64 rounded" />
        </div>
        <CardBody title="">
          <div className="skeleton mb-1 h-5 w-24" />
          <div className="skeleton my-1 h-4 w-32" />
          <div className="skeleton my-1 h-5 w-40 text-xl font-bold" />
        </CardBody>
      </Card>
      <Card>
        <CardBody title="">
          <div className="skeleton mb-1 h-5 w-32" />
          <div className="sm:columns-2 md:columns-3 lg:columns-4">
            {range(24).map((i) => (
              <div key={i} className="my-1 inline-block w-full">
                <div className={clsx("skeleton h-6", widths[(3 * i) % widths.length])} />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
