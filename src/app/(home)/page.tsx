import Link from "next/link";
import { ReactNode } from "react";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Card, CardActions, CardBody } from "@olinfo/react-components";
import { BookText, LucideIcon, Route, UsersRound } from "lucide-react";

import { loadLocale } from "~/lib/locale";

import { Footer } from "./footer";

export default async function Home() {
  await loadLocale();
  const { _ } = useLingui();

  return (
    <div className="flex grow flex-col gap-8">
      <div className="hero">
        <div className="hero-content max-w-2xl flex-col text-center">
          <h1 className="text-pretty text-4xl font-bold">
            <Trans>Portale di allenamento delle Olimpiadi Italiane di Informatica</Trans>
          </h1>
          <p className="py-2">
            <Trans>
              Benvenuto nella piattaforma ufficiale di allenamento per le OII! Qui avrai accesso a
              numerosi problemi ai quali potrai inviare delle soluzioni scritte in un linguaggio di
              programmazione a tua scelta.
            </Trans>
          </p>
          <h2 className="text-2xl font-bold">
            <Trans>Inizia ad allenarti</Trans>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://scolastiche.olinfo.it" className="btn btn-accent">
              <Trans>Scolastiche</Trans>
            </Link>
            <Link href="/tasks/terry/1" className="btn btn-accent">
              <Trans>Territoriali</Trans>
            </Link>
            <Link href="/tasks/1" className="btn btn-accent">
              <Trans>Nazionali, OIS e altre gare</Trans>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid gap-4 *:mb-auto md:grid-cols-3">
        <Card>
          <CardBody title={_(msg`Impara gradualmente`)}>
            <p>
              <Trans>
                Con Algobadge ti guideremo attraverso una selezione accurata di task da risolvere,
                ordinati per difficoltà crescente, che ti permetteranno di esplorare nuove tecniche
                algoritmiche in modo graduale ed efficace.
              </Trans>
            </p>
            <CardButton href="https://algobadge.olinfo.it" icon={Route}>
              <Trans>Algobadge</Trans>
            </CardButton>
          </CardBody>
        </Card>

        <Card>
          <CardBody title={_(msg`Entra nella community`)}>
            <p>
              <Trans>
                Presentati agli altri aspiranti olimpici nel forum della piattaforma, discuti dei
                problemi, risolvi tutti i tuoi dubbi su: costrutti di base del tuo linguaggio di
                programmazione, algoritmi e strutture dati di libreria, tecniche algoritmiche, e
                tanto altro!
              </Trans>
            </p>
            <CardButton href="https://forum.olinfo.it" icon={UsersRound}>
              <Trans>Forum</Trans>
            </CardButton>
          </CardBody>
        </Card>

        <Card>
          <CardBody title={_(msg`Leggi la wiki`)}>
            <p>
              <Trans>
                Nella wiki ufficiale troverai spiegazioni dettagliate e soluzioni di problemi
                passati, oltre che a tutorial approfonditi su tecniche algoritmiche avanzate.
              </Trans>
            </p>
            <CardButton href="https://wiki.olinfo.it" icon={BookText}>
              <Trans>Wiki</Trans>
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
