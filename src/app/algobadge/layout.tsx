"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  Navbar as BaseNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarSubmenu,
} from "@olinfo/react-components";

import { LocaleDropdown } from "~/components/locale";
import { UserDropdown } from "~/components/user";

import { useMyBadges } from "~/lib/algobadge";
import { Title } from "./title";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="relative mx-auto w-full max-w-screen-xl p-4 pb-8">{children}</div>
    </>
  );
}

function Navbar() {
  const { _ } = useLingui();
  const { totalBadge } = useMyBadges();

  return (
    <BaseNavbar color="bg-base-300 text-base-content">
      <NavbarBrand>
        <Title badge={totalBadge} />
      </NavbarBrand>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="/">
            <Trans>Home</Trans>
          </Link>
        </NavbarMenuItem>
        <NavbarSubmenu title={_(msg`Problemi`)}>
          <NavbarMenuItem>
            <Link href="/scolastiche">
              <Trans>Scolastiche</Trans>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/tasks/terry/1">
              <Trans>Territoriali</Trans>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/tasks/1">
              <Trans>Nazionali e OIS</Trans>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/tasks/techniques">
              <Trans>Problemi per tecnica</Trans>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/tasks/events">
              <Trans>Problemi per gara</Trans>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/tasks/years">
              <Trans>Problemi per anno</Trans>
            </Link>
          </NavbarMenuItem>
        </NavbarSubmenu>
        <NavbarMenuItem>
          <Link href="https://forum.olinfo.it">
            <Trans>Forum</Trans>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
      <NavbarContent>
        <LocaleDropdown />
        <UserDropdown />
      </NavbarContent>
    </BaseNavbar>
  );
}
