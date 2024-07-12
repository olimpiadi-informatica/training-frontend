"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  Avatar,
  Navbar as BaseNavbar,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarSubmenu,
} from "@olinfo/react-components";
import { type SyncUser, type User, logout } from "@olinfo/training-api";
import clsx from "clsx";
import { ChevronDown, Languages, LogIn, LogOut, UserRound } from "lucide-react";
import { useSWRConfig } from "swr";

import { useUser } from "~/components/user";

import logo from "./icon0.svg";

export function Navbar() {
  const path = usePathname();
  const user = useUser();
  const { _ } = useLingui();

  return (
    <BaseNavbar color="bg-base-300 text-base-content">
      <NavbarBrand>
        <img
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt={_(msg`Logo OII`)}
          className="h-full w-auto"
        />
      </NavbarBrand>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="/">
            <Trans>Home</Trans>
          </Link>
        </NavbarMenuItem>
        <NavbarSubmenu title={_(msg`Problemi`)}>
          <NavbarMenuItem>
            <Link href="https://scolastiche.olinfo.it">
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
          <Link href="/ranking/1">
            <Trans>Classifica</Trans>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="https://algobadge.olinfo.it">
            <Trans>Algobadge</Trans>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="https://forum.olinfo.it">
            <Trans>Forum</Trans>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
      <NavbarContent>
        <LocaleDropdown />
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <Link
            href={`/login?redirect=${encodeURIComponent(path)}`}
            className="btn btn-ghost no-animation flex-nowrap">
            <Trans>Accedi</Trans> <LogIn />
          </Link>
        )}
      </NavbarContent>
    </BaseNavbar>
  );
}

function LocaleDropdown() {
  const router = useRouter();
  const { i18n } = useLingui();

  const changeLanguage = (lang: string) => {
    document.cookie = `lang=${lang}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <Dropdown className="dropdown-end">
      <DropdownButton className="gap-1">
        <Languages size={20} />
        <ChevronDown size={18} strokeWidth={2.5} />
      </DropdownButton>
      <DropdownMenu>
        <li>
          <button
            className={clsx(i18n.locale === "it" && "active")}
            onClick={() => changeLanguage("it")}
            type="button">
            &#127470;&#127481; Italiano
          </button>
        </li>
        <li>
          <button
            className={clsx(i18n.locale === "en" && "active")}
            onClick={() => changeLanguage("en")}
            type="button">
            &#127468;&#127463; English
          </button>
        </li>
      </DropdownMenu>
    </Dropdown>
  );
}

function UserDropdown({ user }: { user: User | SyncUser }) {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const onLogout = async () => {
    await logout();
    await mutate("api/me");
    router.refresh();
  };

  return (
    <Dropdown className="dropdown-end">
      <DropdownButton>
        <Avatar size={32} user={user} />
        <div className="truncate uppercase">{user.username}</div>
      </DropdownButton>
      <DropdownMenu>
        <li>
          <Link href={`/user/${user.username}`} className="flex justify-between gap-4">
            <Trans>Profilo</Trans> <UserRound size={20} />
          </Link>
        </li>
        <li>
          <button className="flex justify-between gap-4" onClick={onLogout} type="button">
            <Trans>Esci</Trans> <LogOut size={20} />
          </button>
        </li>
      </DropdownMenu>
    </Dropdown>
  );
}
