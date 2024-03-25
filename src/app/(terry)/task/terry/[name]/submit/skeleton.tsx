import Link from "next/link";

import { Button, Form, SingleFileField, SubmitButton } from "@olinfo/react-components";
import { Send, ServerCog } from "lucide-react";

import { H2 } from "~/components/header";

export function Skeleton({ taskName }: { taskName: string }) {
  return (
    <div>
      <H2 className="mb-2">Ottieni input</H2>
      <div className="flex justify-center">
        <Button className="btn-primary" disabled icon={ServerCog}>
          Richiedi input
        </Button>
      </div>
      <div className="divider mx-auto w-full max-w-sm" />
      <Form onSubmit={() => {}} disabled>
        <H2>Invia soluzione</H2>
        <SingleFileField field="source" label="File sorgente" />
        <SingleFileField field="output" label="File di output" />
        <SubmitButton icon={Send}>Invia</SubmitButton>
        <Link href={`/task/terry/${taskName}/help`} className="link link-info mt-4">
          Cosa devo inviare?
        </Link>
      </Form>
    </div>
  );
}
