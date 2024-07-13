import Link from "next/link";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Button, Form, SingleFileField, SubmitButton } from "@olinfo/react-components";
import { Send, ServerCog } from "lucide-react";

import { H2 } from "~/components/header";

export function Skeleton({ taskName }: { taskName: string }) {
  const { _ } = useLingui();

  return (
    <div>
      <H2 className="mb-2">
        <Trans>Ottieni input</Trans>
      </H2>
      <div className="flex justify-center">
        <Button className="btn-primary" disabled icon={ServerCog}>
          <Trans>Richiedi input</Trans>
        </Button>
      </div>
      <div className="divider mx-auto w-full max-w-sm" />
      <Form onSubmit={() => {}} disabled>
        <H2>
          <Trans>Invia soluzione</Trans>
        </H2>
        <SingleFileField field="source" label={_(msg`File sorgente`)} />
        <SingleFileField field="output" label={_(msg`File di output`)} />
        <SubmitButton icon={Send}>Invia</SubmitButton>
        <Link href={`/task/terry/${taskName}/help`} className="link link-info mt-4">
          <Trans>Cosa devo inviare?</Trans>
        </Link>
      </Form>
    </div>
  );
}
