"use server";

import { redirect } from "next/navigation";

import {
  type Task,
  submitBatch as submitBatchAPI,
  submitOutputOnly as submitOutputOnlyAPI,
} from "@olinfo/training-api";

export async function submitBatch(task: Task, language: string, files: FormData) {
  const sub = await submitBatchAPI(task, language, files.get("src") as File);
  redirect(`/task/${task.name}/submissions/${sub.id}`);
}

export async function submitOutputOnly(task: Task, files: FormData) {
  const outputs = Object.fromEntries(files.entries()) as Record<string, File>;

  const sub = await submitOutputOnlyAPI(task, outputs);
  redirect(`/task/${task.name}/submissions/${sub.id}`);
}
