import Link from "next/link";

import { H2 } from "~/components/header";

export default function Page() {
  return (
    <>
      <H2>Cambia foto profilo</H2>
      <div className="flex justify-center">
        <Link href="https://gravatar.com/" className="btn btn-primary">
          Modifica su Gravatar
        </Link>
      </div>
    </>
  );
}
