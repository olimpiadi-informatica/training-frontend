import { getContest } from "@olinfo/training-api";

import { PageClient } from "./page-client";

export default async function Page() {
  const contest = await getContest();
  return <PageClient contest={contest} />;
}
