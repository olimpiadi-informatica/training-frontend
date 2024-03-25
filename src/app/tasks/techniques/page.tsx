import Link from "next/link";

import { Menu } from "@olinfo/react-components";

import { H1 } from "~/components/header";

export default function Page() {
  return (
    <>
      <H1 className="mb-2">Problemi per tecnica</H1>
      <Menu>
        <li>
          <Link href="/tasks/1?tag=ad_hoc">Ad hoc</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=divide_and_conquer">Divide & Conquer</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=geometry">Geometria</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=graphs">Grafi</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=greedy">Greedy</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=implementation">Implementazione</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=math">Matematica</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=extreme_optimization">Ottimizzazioni estreme</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=dp">Programmazione dinamica</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=binary_search">Ricerca binaria</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=strings">Stringhe</Link>
        </li>
        <li>
          <Link href="/tasks/1?tag=data_structures">Strutture dati</Link>
        </li>
      </Menu>
    </>
  );
}
