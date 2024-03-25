"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  CheckboxField,
  CurrentPasswordField,
  Form,
  SubmitButton,
  UsernameField,
} from "@olinfo/react-components";
import { login } from "@olinfo/training-api";
import { useSWRConfig } from "swr";

import { H1 } from "~/components/header";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const { mutate } = useSWRConfig();

  const submit = async (credential: {
    username: string;
    password: string;
    keepSigned: boolean;
  }) => {
    try {
      await login(credential.username, credential.password, credential.keepSigned);
    } catch (err) {
      switch ((err as Error).message) {
        case "login.error":
          throw new Error("Username o password non corretti");
        default:
          throw err;
      }
    }
    await mutate("api/me");
    router.push(params.get("redirect") || "/");
    router.refresh();
  };

  return (
    <Form defaultValue={{ keepSigned: true }} onSubmit={submit}>
      <H1>Accedi</H1>
      <UsernameField field="username" />
      <CurrentPasswordField field="password" />
      <CheckboxField field="keepSigned" label="Ricordami" optional />
      <SubmitButton>Entra</SubmitButton>
      <div className="mt-6 w-full">
        <Link href="/recover" className="link link-info">
          Password dimenticata
        </Link>
      </div>
      <div className="mt-1 w-full">
        <Link href="/signup" className="link link-info">
          Crea un nuovo account
        </Link>
      </div>
    </Form>
  );
}
