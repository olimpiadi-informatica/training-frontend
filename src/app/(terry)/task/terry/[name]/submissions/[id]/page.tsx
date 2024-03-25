"use client";

import Link from "next/link";
import { Fragment, ReactNode } from "react";

import { DateTime } from "@olinfo/react-components";
import { Submission, getSubmission } from "@olinfo/terry-api";
import clsx from "clsx";
import { Check, FileInput, FileOutput, X } from "lucide-react";
import useSWR from "swr";

import { H2, H3 } from "~/components/header";
import { OutcomeScore } from "~/components/outcome";
import { SourceCode } from "~/components/source-code";
import { useTerryUser } from "~/components/user";
import { language } from "~/lib/language";

import { Skeleton } from "./skeleton";

type Props = {
  params: { name: string; id: string };
};

export default function Page({ params: { name: taskName, id } }: Props) {
  const user = useTerryUser();
  const task = user?.contest.tasks.find((t) => t.name === taskName);

  const { data: submission } = useSWR<Submission, Error, [string, string]>(
    ["terry/submission", id],
    ([, id]) => getSubmission(id),
  );

  if (!task || !submission) return <Skeleton />;

  return (
    <div>
      <H2>
        Sottoposizione {submission.input.attempt}-{submission.id.split("-")[0]}
      </H2>
      <H3 className="mb-2 mt-6">Dettagli</H3>
      <ul className="w-full rounded-box bg-base-200 p-2 *:p-2">
        <li>
          <span className="font-bold">Esito:</span>{" "}
          <OutcomeScore score={submission.score} maxScore={task?.max_score} />
        </li>
        <li>
          <span className="font-bold">Linguaggio:</span> {language(submission.source.path)}
        </li>
        <li>
          <span className="font-bold">Data e ora:</span> <DateTime date={submission.date} />
        </li>
      </ul>
      <H3 className="mb-2 mt-6">Testcase</H3>
      <div className="w-full overflow-x-auto max-md:w-screen max-md:-translate-x-4 max-md:px-4">
        <TestcaseTable submission={submission} />
      </div>
      <H3 className="mb-2 mt-6">Codice sorgente</H3>
      <SourceCode url={`/api-terry/files/${submission.source.path}`} />
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link
          href={`/api-terry/files/${submission.input.path}`}
          className="btn btn-primary"
          download>
          <FileInput size={22} /> Scarica input
        </Link>
        <Link
          href={`/api-terry/files/${submission.output.path}`}
          className="btn btn-primary"
          download>
          <FileOutput size={22} /> Scarica output
        </Link>
      </div>
    </div>
  );
}

function TestcaseTable({ submission }: { submission: Submission }) {
  return (
    <div className="grid min-w-fit grid-cols-[auto_auto_1fr] text-nowrap rounded-box bg-base-200 px-4 py-2 text-sm *:px-2 *:py-1">
      <Header>Testcase</Header>
      <Header>Risultato</Header>
      <Header className="text-center">Dettagli</Header>
      {submission.feedback.cases.map((tc, idx) => {
        const output = submission.output.validation.cases[idx];
        return (
          <Fragment key={idx}>
            <div className="font-mono">Case #{idx + 1}</div>
            {tc.correct ? (
              <div className="text-success">
                <Check className="inline" /> Corretto
              </div>
            ) : output.status === "missing" ? (
              <div className="text-error">
                <X className="inline" /> Non inviato
              </div>
            ) : (
              <div className="text-error">
                <X className="inline" /> Errato
              </div>
            )}
            <div className="min-w-40 text-wrap">{tc.message ?? output.message}</div>
          </Fragment>
        );
      })}
    </div>
  );
}

function Header({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("!py-2 text-sm font-bold opacity-60", className)}>{children}</div>;
}
