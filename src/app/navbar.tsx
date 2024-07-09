"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  Avatar,
  Navbar as BaseNavbar,
  NavbarMenu as BaseNavbarMenu,
  Dropdown,
  DropdownButton,
  DropdownMenu,
} from "@olinfo/react-components";
import { SyncUser, User, logout } from "@olinfo/training-api";
import { Languages, LogIn, LogOut, MenuIcon, UserRound } from "lucide-react";
import { useSWRConfig } from "swr";

import { useUser } from "~/components/user";

import logo from "./icon0.svg";

export function Navbar() {
  const path = usePathname();
  const user = useUser();
  const { _ } = useLingui();

  return (
    <BaseNavbar color="bg-base-300 text-base-content">
      <div>
        <Dropdown className="md:hidden">
          <DropdownButton>
            <MenuIcon aria-label={_(msg`Menu`)} />
          </DropdownButton>
          <DropdownMenu>
            <NavbarMenu />
          </DropdownMenu>
        </Dropdown>
        <img
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt={_(msg`Logo OII`)}
          className="mx-2 h-8 w-auto flex-none"
        />
        <div className="max-md:hidden">
          <BaseNavbarMenu>
            <NavbarMenu />
          </BaseNavbarMenu>
        </div>
      </div>
      <div>
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
      </div>
    </BaseNavbar>
  );
}

function NavbarMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const path = usePathname();
  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [path]);

  return (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <details ref={ref}>
          <summary className="after:forced-color-adjust-none">
            <Trans>Problemi</Trans>
          </summary>
          <ul>
            <li>
              <Link href="https://scolastiche.olinfo.it">
                <Trans>Scolastiche</Trans>
              </Link>
            </li>
            <li>
              <Link href="/tasks/terry/1">
                <Trans>Territoriali</Trans>
              </Link>
            </li>
            <li>
              <Link href="/tasks/1">
                <Trans>Nazionali e OIS</Trans>
              </Link>
            </li>
            <li>
              <Link href="/tasks/techniques">
                <Trans>Problemi per tecnica</Trans>
              </Link>
            </li>
            <li>
              <Link href="/tasks/events">
                <Trans>Problemi per gara</Trans>
              </Link>
            </li>
            <li>
              <Link href="/tasks/years">
                <Trans>Problemi per anno</Trans>
              </Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link href="/ranking/1">
          <Trans>Classifica</Trans>
        </Link>
      </li>
      <li>
        <Link href="https://algobadge.olinfo.it">
          <Trans>Algobadge</Trans>
        </Link>
      </li>
      <li>
        <Link href="https://forum.olinfo.it">
          <Trans>Forum</Trans>
        </Link>
      </li>
    </>
  );
}

function LocaleDropdown() {
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    /* eslint-disable-next-line unicorn/no-document-cookie --
     * Until cookie store (https://developer.mozilla.org/en-US/docs/Web/API/CookieStore) is widely supported
     **/
    document.cookie = `lang=${lang}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <Dropdown>
      <DropdownButton>
        <Languages size={22} />
      </DropdownButton>
      <DropdownMenu>
        <li>
          <button onClick={() => changeLanguage("it")}>🇮🇹 Italiano</button>
        </li>
        <li>
          <button onClick={() => changeLanguage("en")}>🇬🇧 English</button>
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
          <button className="flex justify-between gap-4" onClick={onLogout}>
            <Trans>Esci</Trans> <LogOut size={20} />
          </button>
        </li>
      </DropdownMenu>
    </Dropdown>
  );
}
