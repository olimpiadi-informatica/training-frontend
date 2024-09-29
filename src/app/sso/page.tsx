import { getForumSso } from "@olinfo/training-api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { sso: string; sig: string };
};

export default async function Page({ searchParams: { sso: payload, sig: signature } }: Props) {
  const token = cookies().get("training_token")?.value;

  // User is logged out.
  if (token === undefined) {
    const redirectUrl = `/sso?sso=${payload}&sig=${signature}`;
    redirect(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
  }

  const { return_sso_url: returnSsoUrl, parameters } = await getForumSso(
    payload,
    signature,
    `training_token=${token}`,
  );

  redirect(`${returnSsoUrl}?${parameters}`);
}
