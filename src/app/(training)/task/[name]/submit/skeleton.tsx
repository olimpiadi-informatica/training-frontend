import { usePathname } from "next/navigation";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Form, SelectField, SingleFileField, SubmitButton } from "@olinfo/react-components";
import clsx from "clsx";
import { Send } from "lucide-react";

import { H2 } from "~/components/header";

export function Skeleton() {
  const isSubmitPage = usePathname().endsWith("/submit");
  const { _ } = useLingui();

  return (
    <Form onSubmit={() => {}} disabled className="!max-w-full grow">
      <H2>
        <Trans>Invia soluzione</Trans>
      </H2>
      <div
        className={clsx(
          "mb-4 flex max-w-sm flex-col items-center",
          isSubmitPage && "md:max-w-3xl md:flex-row md:items-start md:gap-4",
        )}>
        <SelectField field="lang" label={_(msg`Linguaggio`)} options={{ "": "C++17 / g++" }} />
        <SingleFileField field="src" label={_(msg`Codice sorgente`)} />
        <div className="mt-5 flex-none">
          <SubmitButton icon={Send}>
            <Trans>Invia</Trans>
          </SubmitButton>
        </div>
      </div>
      {isSubmitPage && (
        <div className="skeleton h-[75vh] w-full grow rounded border border-base-content/10" />
      )}
    </Form>
  );
}
