"use client";

import { useRouter } from "next/navigation";

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

  const submit = async (data: { oldPassword: string; newPassword: string }) => {
    try {
      await changePassword(data.oldPassword, data.newPassword);
    } catch (err) {
      switch ((err as Error).message) {
        case "Wrong password":
          throw new FormFieldError("oldPassword", "Password non corretta");
        default:
          throw err;
      }
    }
    await mutate("api/me");
    router.push(`/user/${username}`);
    router.refresh();
    notifySuccess("Password modificata con successo");
    await new Promise(() => {});
  };

  return (
    <Form onSubmit={submit}>
      <H2>Modifica password</H2>
      <CurrentPasswordField field="oldPassword" label="Vecchia password" />
      <NewPasswordField field="newPassword" label="Nuova password" minLength={8} />
      <SubmitButton>Modifica password</SubmitButton>
    </Form>
  );
}
