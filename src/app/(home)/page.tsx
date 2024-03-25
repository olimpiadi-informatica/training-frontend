import Link from "next/link";
import { ReactNode } from "react";

import { Card, CardActions, CardBody } from "@olinfo/react-components";
import { BookText, Dumbbell, LucideIcon, Route, UsersRound } from "lucide-react";

import { Footer } from "./footer";

export default function Home() {
  return (
    <div className="flex grow flex-col gap-8">
      <div className="hero">
        <div className="hero-content max-w-2xl flex-col text-center">
          <h1 className="text-pretty text-4xl font-bold">
            Portale di allenamento delle Olimpiadi Italiane di Informatica
          </h1>
          <p className="py-2">
            Benvenuto nella piattaforma ufficiale di allenamento per le OII! Qui avrai accesso a
            numerosi problemi ai quali potrai inviare delle soluzioni scritte in un linguaggio di
            programmazione a tua scelta.
          </p>
          <Link href="/tasks/1" className="btn btn-accent btn-lg">
            <Dumbbell size={22} /> Inizia ad allenarti
          </Link>
        </div>
      </div>
      <div className="grid gap-4 *:mb-auto md:grid-cols-3">
        <Card>
          <CardBody title="Impara gradualmente">
            Con Algobadge ti guideremo attraverso una selezione accurata di task da risolvere,
            ordinati per difficoltà crescente, che ti permetteranno di esplorare nuove tecniche
            algoritmiche in modo graduale ed efficace.
            <CardButton href="https://algobadge.olinfo.it" icon={Route}>
              Algobadge
            </CardButton>
          </CardBody>
        </Card>

        <Card>
          <CardBody title="Entra nella community">
            Presentati agli altri aspiranti olimpici nel forum della piattaforma, discuti dei
            problemi, risolvi tutti i tuoi dubbi su: costrutti di base del tuo linguaggio di
            programmazione, algoritmi e strutture dati di libreria, tecniche algoritmiche, e tanto
            altro!
            <CardButton href="https://forum.olinfo.it" icon={UsersRound}>
              Forum
            </CardButton>
          </CardBody>
        </Card>

        <Card>
          <CardBody title="Leggi la wiki">
            Nella wiki ufficiale troverai spiegazioni dettagliate e soluzioni di problemi passati,
            oltre che a tutorial approfonditi su tecniche algoritmiche avanzate.
            <CardButton href="https://wiki.olinfo.it" icon={BookText}>
              Wiki
            </CardButton>
          </CardBody>
        </Card>
      </div>
      <div className="relative flex grow flex-col justify-end">
        <div className="relative left-1/2 w-screen -translate-x-1/2 translate-y-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}

type ButtonProps = {
  href: string;
  icon: LucideIcon;
  children: ReactNode;
};

function CardButton({ href, icon: Icon, children }: ButtonProps) {
  return (
    <CardActions>
      <Link className="btn btn-accent" href={href}>
        <Icon size={20} />
        {children}
      </Link>
    </CardActions>
  );
}
