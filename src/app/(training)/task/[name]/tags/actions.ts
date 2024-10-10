"use server";

import { addTag as addTagAPI, removeTag as removeTagAPI } from "@olinfo/training-api";
import { revalidatePath } from "next/cache";

export async function addTag(taskName: string, tagName: string) {
  await addTagAPI(taskName, tagName);
  revalidatePath("/(training)/task/[name]", "layout");
}

export async function removeTag(taskName: string, tagName: string) {
  await removeTagAPI(taskName, tagName);
  revalidatePath("/(training)/task/[name]", "layout");
}
