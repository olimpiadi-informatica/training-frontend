import { redirect } from "next/navigation";

import { getMe } from "@olinfo/training-api";

import { PageClient } from "./page-client";

type Props = {
  searchParams: {
    redirect?: string;
  };
};

export default async function Page({ searchParams: { redirect: redirectUrl = "/" } }: Props) {
  if (await getMe()) {
    return redirect(redirectUrl);
  }

  return <PageClient redirectUrl={redirectUrl} />;
}
