"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { abandonInput, generateInput, submit, uploadOutput, uploadSource } from "@olinfo/terry-api";

export async function requestInput(token: string, taskName: string) {
  await generateInput(token, taskName);
  revalidatePath("/(training)/(terry)/task/terry/[name]", "layout");
}

export async function changeInput(token: string, inputId: string) {
  await abandonInput(token, inputId);
  revalidatePath("/(training)/(terry)/task/terry/[name]", "layout");
}

export async function uploadAndSubmit(taskName: string, inputId: string, files: FormData) {
  const [source, output] = await Promise.all([
    uploadSource(inputId, files.get("source") as File),
    uploadOutput(inputId, files.get("output") as File),
  ]);

  for (const alert of source.validation.alerts) {
    if (alert.severity === "warning") {
      throw new Error(alert.message);
    }
  }

  const submission = await submit(inputId, source.id, output.id);
  redirect(`/task/terry/${taskName}/submissions/${submission.id}`);
}
