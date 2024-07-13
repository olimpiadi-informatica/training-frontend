import { cookies } from "next/headers";
import type { ReactNode } from "react";

import { getMeSync } from "@olinfo/training-api";

import { LayoutClient } from "./layout-client";

export default function Layout({ children }: { children: ReactNode }) {
  const token = cookies().get("training_token");
  const user = token && getMeSync(token.value);

  return (
    <LayoutClient syncUser={user}>
      <div className="mx-auto flex w-full max-w-screen-xl grow flex-col p-4 pb-8">{children}</div>
    </LayoutClient>
  );
}
