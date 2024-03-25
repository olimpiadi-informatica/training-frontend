import type { StaticImageData } from "next/image";
import Link from "next/link";

import aica from "~/images/aica.webp";
import oii from "~/images/logo-full.svg";
import ministero from "~/images/ministero.webp";

export function Footer() {
  return (
    <footer className="footer justify-center bg-base-200 p-10 text-base-content">
      <ImageLink href="https://www.aicanet.it" src={aica} alt="Aica" />
      <ImageLink
        href="https://olimpiadi-informatica.it"
        src={oii}
        alt="Olimpiadi Italiane di Informatica"
      />
      <ImageLink href="https://miur.gov.it/" src={ministero} alt="Ministero dell'istruzione" />
    </footer>
  );
}

function ImageLink({ src, alt, href }: { src: StaticImageData; alt: string; href: string }) {
  return (
    <Link href={href} className="mx-auto h-full">
      <img
        src={src.src}
        width={src.width}
        height={src.height}
        alt={alt}
        className="h-full max-h-20 w-auto rounded-lg p-2 dark:bg-white"
      />
    </Link>
  );
}
