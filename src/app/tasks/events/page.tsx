import Link from "next/link";

import { Menu } from "@olinfo/react-components";

import { H1, H2 } from "~/components/header";

export default function Page() {
  return (
    <>
      <H1>Problemi per gara</H1>
      <H2 className="mb-2 mt-6">Gare ufficiali</H2>
      <Menu>
        <li>
          <Link href="https://scolastiche.olinfo.it">Scolastiche</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=territoriali">
            Territoriali <span className="text-base-content/60">(vecchio formato)</span>
          </Link>
        </li>
        <li>
          <Link href="/tasks/terry/1">
            Territoriali <span className="text-base-content/60">(nuovo formato)</span>
          </Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=pre-oii">Pre-OII</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=nazionali">Nazionali</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=ois">
            Gare a squadre <span className="text-base-content/60">(OIS)</span>
          </Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=ioi">
            International Olympiad in Informatics
            <span className="text-base-content/60">(IOI)</span>
          </Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=ioit">
            International Informatics Olympiad in Teams
            <span className="text-base-content/60">(IIOT)</span>
          </Link>
        </li>
      </Menu>
      <H2 className="mb-2 mt-6">Altre gare</H2>
      <Menu>
        <li>
          <Link href="/tasks/1?tag=abc">
            Algoritmi Bergamo Contest <span className="text-base-content/60">(ABC)</span>
          </Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=coci">
            Croatian Open Competition in Informatics
            <span className="text-base-content/60">(COCI)</span>
          </Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=roiti">Gara di allenamento Istituto Roiti Ferrara</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=gator">
            Gara di Allenamento Tor Vergata <span className="text-base-content/60">(GATOR)</span>
          </Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=unimiopc">
            Selezione SWERC dell&apos;Università degli Studi di Milano
          </Link>
        </li>
      </Menu>
    </>
  );
}
