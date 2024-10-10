import { notFound } from "next/navigation";

import { getEventTags, getMe, getTags, getTask } from "@olinfo/training-api";

import { PageClient } from "./page-client";

type Props = {
  params: { name: string };
};

export default async function Page({ params: { name } }: Props) {
  const [user, task, tags, eventTags] = await Promise.all([
    getMe(),
    getTask(name),
    getTags(),
    getEventTags(),
  ]);
  if (!task) notFound();

  return <PageClient task={task} tags={tags} eventTags={eventTags} isLogged={!!user} />;
}
