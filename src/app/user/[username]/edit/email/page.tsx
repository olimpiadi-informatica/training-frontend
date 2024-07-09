"use client";

import { useRouter } from "next/navigation";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  EmailField,
  Form,
  FormFieldError,
  SubmitButton,
  useNotifications,
} from "@olinfo/react-components";
import { changeEmail } from "@olinfo/training-api";
import { useSWRConfig } from "swr";

import { H2 } from "~/components/header";

type Props = {
  params: { username: string };
};

export default function Page({ params: { username } }: Props) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { notifySuccess } = useNotifications();
  const { _ } = useLingui();

  const submit = async (data: { email: string }) => {
    try {
      await changeEmail(data.email);
    } catch (err) {
      switch ((err as Error).message) {
        case "Invalid e-mail":
          throw new FormFieldError("email", _(msg`Email non valida`));
        case "E-mail already used":
          throw new FormFieldError("email", _(msg`Email già in uso`));
        default:
          throw err;
      }
    }
    await mutate("api/me");
    await mutate(["api/user", username]);
    router.push(`/user/${username}`);
    router.refresh();
    notifySuccess(_(msg`Email modificata con successo`));
    await new Promise(() => {});
  };

  return (
    <Form onSubmit={submit}>
      <H2>
        <Trans>Modifica email</Trans>
      </H2>
      <EmailField field="email" />
      <SubmitButton>
        <Trans>Modifica email</Trans>
      </SubmitButton>
    </Form>
  );
}
