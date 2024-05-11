import { useRouter } from "next/navigation";

import { Form, MultipleFileField, SubmitButton } from "@olinfo/react-components";
import { Task, submitOutputOnly } from "@olinfo/training-api";
import { sortBy } from "lodash-es";
import { Send } from "lucide-react";

import { H2 } from "~/components/header";

export function SubmitOutputOnly({ task }: { task: Task }) {
  const router = useRouter();

  const validate = (files: Record<string, File>) => {
    for (const output of task.submission_format) {
      if (!files[output]) return `File "${output}" mancante`;
    }
  };

  const submit = async ({ outputs }: { outputs: Record<string, File> }) => {
    const sub = await submitOutputOnly(task, outputs);
    router.push(`/task/${task.name}/submissions/${sub.id}`);
    await new Promise(() => {});
  };

  return (
    <Form onSubmit={submit}>
      <H2>Invia output</H2>
      <div>Devi inviare i seguenti file:</div>
      <div className="columns-2 text-sm">
        {sortBy(task.submission_format).map((file) => (
          <div key={file}>{file}</div>
        ))}
      </div>
      <MultipleFileField field="outputs" label="File di output" accept=".txt" validate={validate} />
      <SubmitButton icon={Send}>Invia</SubmitButton>
    </Form>
  );
}
