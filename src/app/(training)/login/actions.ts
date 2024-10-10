"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { login as loginAPI } from "@olinfo/training-api";

export async function login(
  username: string,
  password: string,
  keepSigned: boolean,
  redirectUrl: string,
) {
  await loginAPI(username, password, keepSigned);
  revalidatePath("/", "layout");
  redirect(redirectUrl);
}
