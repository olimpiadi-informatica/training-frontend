import { usePathname } from "next/navigation";

import { Form, SelectField, SingleFileField, SubmitButton } from "@olinfo/react-components";
import clsx from "clsx";
import { Send } from "lucide-react";

import { H2 } from "~/components/header";

export function Skeleton() {
  const isSubmitPage = usePathname().endsWith("/submit");

  return (
    <Form onSubmit={() => {}} disabled className="!max-w-full grow">
      <H2>Invia soluzione</H2>
      <div
        className={clsx(
          "mb-4 flex max-w-sm flex-col items-center",
          isSubmitPage && "md:max-w-3xl md:flex-row md:items-start md:gap-4",
        )}>
        <SelectField field="lang" label="Linguaggio" options={{ "": "C++17 / g++" }} />
        <SingleFileField field="src" label="Codice sorgente" />
        <div className="mt-5 flex-none">
          <SubmitButton icon={Send}>Invia</SubmitButton>
        </div>
      </div>
      {isSubmitPage && (
        <div className="skeleton h-[75vh] w-full grow rounded border border-base-content/10" />
      )}
    </Form>
  );
}
