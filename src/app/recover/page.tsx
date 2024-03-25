"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  EmailField,
  Form,
  FormFieldError,
  SubmitButton,
  TextField,
  useNotifications,
} from "@olinfo/react-components";
import { recoverPassword } from "@olinfo/training-api";
import { MailOpen } from "lucide-react";

import { H1 } from "~/components/header";

export default function Page() {
  const router = useRouter();
  const { notifySuccess } = useNotifications();
  const [sent, setSent] = useState(false);

  const submit = async (recover: { email: string; code: string }) => {
    try {
      await recoverPassword(recover.email, recover.code);
    } catch (err) {
      switch ((err as Error).message) {
        case "No such user":
          throw new FormFieldError("email", "Email non registrata");
        case "Wrong code":
          throw new FormFieldError("code", "Codice non valido");
        default:
          throw err;
      }
    }

    if (recover.code) {
      notifySuccess("Una password temporanea è stata inviata alla tua email");
      router.push("/login");
    } else {
      notifySuccess("Un codice di recupero è stato inviato alla tua email");
      setSent(true);
    }
  };

  return (
    <Form defaultValue={{ code: "" }} onSubmit={submit}>
      <H1>Recupera password</H1>
      <EmailField field="email" disabled={sent} />
      {sent && (
        <TextField
          field="code"
          label="Codice di recupero"
          placeholder="Inserisci il codice di recupero"
          autoComplete="off"
          icon={MailOpen}
        />
      )}
      <SubmitButton>{sent ? "Cambia password" : "Invia email"}</SubmitButton>
    </Form>
  );
}
