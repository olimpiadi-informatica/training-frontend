"use client";

import { useRouter } from "next/navigation";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  CurrentPasswordField,
  Form,
  FormFieldError,
  NewPasswordField,
  SubmitButton,
  useNotifications,
} from "@olinfo/react-components";
import { changePassword } from "@olinfo/training-api";
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

  const submit = async (data: { oldPassword: string; newPassword: string }) => {
    try {
      await changePassword(data.oldPassword, data.newPassword);
    } catch (err) {
      switch ((err as Error).message) {
        case "Wrong password":
          throw new FormFieldError("oldPassword", _(msg`Password non corretta`));
        default:
          throw err;
      }
    }
    await mutate("api/me");
    router.push(`/user/${username}`);
    router.refresh();
    notifySuccess(_(msg`Password modificata con successo`));
    await new Promise(() => {});
  };

  return (
    <Form onSubmit={submit}>
      <H2>
        <Trans>Modifica password</Trans>
      </H2>
      <CurrentPasswordField field="oldPassword" label={_(msg`Vecchia password`)} />
      <NewPasswordField field="newPassword" label={_(msg`Nuova password`)} minLength={8} />
      <SubmitButton>
        <Trans>Modifica password</Trans>
      </SubmitButton>
    </Form>
  );
}
