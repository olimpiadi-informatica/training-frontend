"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  Avatar,
  Navbar as BaseNavbar,
  NavbarMenu as BaseNavbarMenu,
  Dropdown,
  DropdownButton,
  DropdownMenu,
} from "@olinfo/react-components";
import { SyncUser, User, logout } from "@olinfo/training-api";
import { LogIn, LogOut, MenuIcon, UserRound } from "lucide-react";
import { useSWRConfig } from "swr";

import { useUser } from "~/components/user";

import logo from "./icon0.svg";

export function Navbar() {
  const path = usePathname();
  const user = useUser();

  return (
    <BaseNavbar color="bg-base-300 text-base-content">
      <div>
        <Dropdown className="md:hidden">
          <DropdownButton>
            <MenuIcon aria-label="Menu" />
          </DropdownButton>
          <DropdownMenu>
            <NavbarMenu />
          </DropdownMenu>
        </Dropdown>
        <img
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt="Logo OII"
          className="mx-2 h-8 w-auto flex-none"
        />
        <div className="max-md:hidden">
          <BaseNavbarMenu>
            <NavbarMenu />
          </BaseNavbarMenu>
        </div>
      </div>
      {user ? (
        <UserDropdown user={user} />
      ) : (
        <Link
          href={`/login?redirect=${encodeURIComponent(path)}`}
          className="btn btn-ghost no-animation flex-nowrap">
          Accedi <LogIn />
        </Link>
      )}
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
          <summary>Problemi</summary>
          <ul>
            <li>
              <Link href="/tasks/1">Tutti i problemi</Link>
            </li>
            <li>
              <Link href="/tasks/terry/1">Problemi delle territoriali</Link>
            </li>
            <li>
              <Link href="/tasks/techniques">Problemi per tecnica</Link>
            </li>
            <li>
              <Link href="/tasks/events">Problemi per gara</Link>
            </li>
            <li>
              <Link href="/tasks/years">Problemi per anno</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link href="/ranking/1">Classifica</Link>
      </li>
      <li>
        <Link href="https://algobadge.olinfo.it">Algobadge</Link>
      </li>
      <li>
        <Link href="https://forum.olinfo.it">Forum</Link>
      </li>
    </>
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
            Profilo <UserRound size={20} />
          </Link>
        </li>
        <li>
          <button className="flex justify-between gap-4" onClick={onLogout}>
            Esci <LogOut size={20} />
          </button>
        </li>
      </DropdownMenu>
    </Dropdown>
  );
}
