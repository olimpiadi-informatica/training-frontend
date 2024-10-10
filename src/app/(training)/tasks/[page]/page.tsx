import { type TaskListOptions, getTaskList } from "@olinfo/training-api";

import { notFound } from "next/navigation";
import { PageClient } from "./page-client";

type Params = {
  params: {
    page: string;
  };
  searchParams: TaskListOptions;
};

export default async function Page({ params, searchParams }: Params) {
  const page = Number(params.page);
  const pageSize = 20;

  if (!Number.isInteger(page) || page < 1) notFound();

  const taskList = await getTaskList(page, pageSize, searchParams);

  const pageCount = Math.max(Math.ceil(taskList.num / pageSize), 1);
  if (page > pageCount) notFound();

  return <PageClient taskList={taskList} />;
}
