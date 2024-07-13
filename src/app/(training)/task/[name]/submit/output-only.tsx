import { useRouter } from "next/navigation";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Form, MultipleFileField, SubmitButton } from "@olinfo/react-components";
import { type Task, submitOutputOnly } from "@olinfo/training-api";
import { sortBy } from "lodash-es";
import { Send } from "lucide-react";

import { H2 } from "~/components/header";

export function SubmitOutputOnly({ task }: { task: Task }) {
  const router = useRouter();
  const { _ } = useLingui();

  const validate = (files: Record<string, File>) => {
    for (const output of task.submission_format) {
      if (!files[output]) return _(msg`File "${output}" mancante`);
    }
  };

  const submit = async ({ outputs }: { outputs: Record<string, File> }) => {
    const sub = await submitOutputOnly(task, outputs);
    router.push(`/task/${task.name}/submissions/${sub.id}`);
    await new Promise(() => {});
  };

  return (
    <Form onSubmit={submit}>
      <H2>
        <Trans>Invia output</Trans>
      </H2>
      <div>
        <Trans>Devi inviare i seguenti file:</Trans>
      </div>
      <div className="columns-2 text-sm">
        {sortBy(task.submission_format).map((file) => (
          <div key={file}>{file}</div>
        ))}
      </div>
      <MultipleFileField
        field="outputs"
        label={_(msg`File di output`)}
        accept=".txt"
        validate={validate}
      />
      <SubmitButton icon={Send}>
        <Trans>Invia</Trans>
      </SubmitButton>
    </Form>
  );
}
