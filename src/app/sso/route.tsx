import { getForumSso } from "@olinfo/training-api";
import { redirect } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("training_token")?.value;

  // User is logged out.
  if (token === undefined) {
    const redirectUrl = request.nextUrl.pathname + request.nextUrl.search;
    redirect(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
  }

  const payload = request.nextUrl.searchParams.get("sso");
  const signature = request.nextUrl.searchParams.get("sig");

  if (payload === null || signature === null) {
    return NextResponse.json(
      { message: "Parameters sso and sig must be provided." },
      { status: 400 },
    );
  }

  const { return_sso_url: returnSsoUrl, parameters } = await getForumSso(
    payload,
    signature,
    `training_token=${token}`,
  );

  redirect(`${returnSsoUrl}?${parameters}`);
}
