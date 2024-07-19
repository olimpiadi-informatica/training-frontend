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

import { type User, getUser } from "@olinfo/training-api";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
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

  const params = useSearchParams();
  const impersonate = params.get("impersonate");

  const { data: user } = useSWR<User, Error, [string, string] | false>(
    !!impersonate && ["api/user", impersonate],
    ([, username]) => getUser(username),
    { revalidateIfStale: false },
  );

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
            <Link href="/tasks/terry/1">
              <Trans>Territoriali</Trans>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/tasks/1">
              <Trans>Nazionali e altre gare</Trans>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/tasks/techniques">
              <Trans>Problemi per tecnica</Trans>
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
        <UserDropdown overrideUser={user} />
      </NavbarContent>
    </BaseNavbar>
  );
}
