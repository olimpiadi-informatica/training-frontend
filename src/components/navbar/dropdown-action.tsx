"use client";

import type { ReactNode } from "react";

import { DropdownItem } from "@olinfo/react-components";
import clsx from "clsx";

type Props = {
  action: () => Promise<void>;
  className?: string;
  active?: boolean;
  children: ReactNode;
};

export function DropdownAction({ action, className, active, children }: Props) {
  return (
    <DropdownItem>
      <button
        className={clsx(active && "active", className)}
        onClick={() => action()}
        type="button">
        {children}
      </button>
    </DropdownItem>
  );
}
