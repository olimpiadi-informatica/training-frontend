import { Form, SelectField, SingleFileField, SubmitButton } from "@olinfo/react-components";
import { Send } from "lucide-react";

import { H2 } from "~/components/header";

export function Skeleton() {
  return (
    <Form onSubmit={() => {}} disabled>
      <H2>Invia soluzione</H2>
      <SelectField field="lang" label="Linguaggio" options={{ "": "C++17 / g++" }} />
      <SingleFileField field="src" label="Codice sorgente" />
      <SubmitButton icon={Send}>Invia</SubmitButton>
    </Form>
  );
}
