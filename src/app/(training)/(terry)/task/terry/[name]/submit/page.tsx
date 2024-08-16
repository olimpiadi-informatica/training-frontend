"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useReducer } from "react";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  Button,
  DateDistance,
  Form,
  SingleFileField,
  SubmitButton,
  useIsAfter,
} from "@olinfo/react-components";
import { abandonInput, generateInput, submit, uploadOutput, uploadSource } from "@olinfo/terry-api";
import { ArrowLeftRight, Download, Send, ServerCog, TimerIcon, TriangleAlert } from "lucide-react";
import { useSWRConfig } from "swr";

import { H2 } from "~/components/header";
import { useTerryUser } from "~/components/user";
import { fileLanguageName } from "~/lib/language";

import { Skeleton } from "./skeleton";

type Props = {
  params: { name: string };
};

export default function Page({ params: { name: taskName } }: Props) {
  const router = useRouter();
  const user = useTerryUser();
  const { mutate } = useSWRConfig();
  const { _ } = useLingui();

  const task = user?.contest.tasks.find((t) => t.name === taskName);
  const input = user?.tasks[task?.name ?? ""].current_input;
  const expired = useIsAfter(input?.expiry_date ?? undefined);

  if (!user) return <Skeleton taskName={taskName} />;
  if (!task) return notFound();

  const requestInput = async () => {
    await generateInput(user.token, task.name);
    await mutate(["terry/user", user.token]);
  };

  const changeInput = async () => {
    await abandonInput(user.token, input!.id);
    await mutate(["terry/user", user.token]);
  };

  const validateSource = (file: File) => {
    const lang = fileLanguageName(file.name);
    if (lang === "N/A") {
      return _(msg`Seleziona il file sorgente`);
    }
  };

  const onSubmit = async (data: { source: File; output: File }) => {
    const source = await uploadSource(input!.id, data.source);
    for (const alert of source.validation.alerts) {
      if (alert.severity === "warning") {
        throw new Error(alert.message);
      }
    }

    const output = await uploadOutput(input!.id, data.output);
    const submission = await submit(input!.id, source.id, output.id);
    await mutate(["terry/user", user.token]);
    router.push(`/task/terry/${taskName}/submissions/${submission.id}`);
    await new Promise(() => {});
  };

  return (
    <div>
      <H2 className="mb-2">
        <Trans>Ottieni input</Trans>
      </H2>
      {input ? (
        <>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`/api-terry/files/${input.path}`} download className="btn btn-primary">
              <Download /> <Trans>Scarica input</Trans>
            </a>
            <Button className="btn-primary" onClick={changeInput} icon={ArrowLeftRight}>
              <Trans>Cambia input</Trans>
            </Button>
          </div>
          <div className="mt-2 grid justify-center">
            {expired ? (
              <span className="text-sm text-error/70">
                <TriangleAlert className="inline-block align-text-bottom" size={16} />{" "}
                <Trans>Questo input è scaduto.</Trans>
              </span>
            ) : (
              input.expiry_date && <Timer date={input.expiry_date} />
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <Button className="btn-primary" onClick={requestInput} icon={ServerCog}>
            <Trans>Richiedi input</Trans>
          </Button>
        </div>
      )}
      <div className="divider mx-auto w-full max-w-sm" />
      <Form onSubmit={onSubmit} disabled={!input || expired}>
        <H2>Invia soluzione</H2>
        <SingleFileField field="source" label={_(msg`File sorgente`)} validate={validateSource} />
        <SingleFileField field="output" label={_(msg`File di output`)} />
        <SubmitButton icon={Send}>Invia</SubmitButton>
        <Link href={`/task/terry/${taskName}/help`} className="link link-info mt-4">
          <Trans>Cosa devo inviare?</Trans>
        </Link>
      </Form>
    </div>
  );
}

function Timer({ date }: { date: Date }) {
  const [, refresh] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const id = setInterval(refresh, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-sm text-base-content/80">
      <TimerIcon className="inline-block align-text-top" size={14} />{" "}
      <Trans>
        Questo input scade <DateDistance date={date} />.
      </Trans>
    </span>
  );
}
