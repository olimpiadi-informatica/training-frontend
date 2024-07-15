"use client";

import { type ReactNode, createContext, useContext } from "react";

import { Trans } from "@lingui/macro";
import { Avatar, Dropdown, DropdownButton, DropdownMenu } from "@olinfo/react-components";
import type { User as TerryUser } from "@olinfo/terry-api";
import { type SyncUser, type User, logout } from "@olinfo/training-api";
import { LogIn, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

const UserContext = createContext<User | SyncUser | undefined>(undefined);

type TrainingProps = {
  user: User | SyncUser | undefined;
  children: ReactNode;
};

export function UserProvider({ user, children }: TrainingProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

const TerryUserContext = createContext<TerryUser | undefined>(undefined);

type TerryProps = {
  user: TerryUser | undefined;
  children: ReactNode;
};

export function TerryUserProvider({ user, children }: TerryProps) {
  return <TerryUserContext.Provider value={user}>{children}</TerryUserContext.Provider>;
}

export function useTerryUser() {
  return useContext(TerryUserContext);
}

export function UserDropdown() {
  const path = usePathname();
  const user = useUser();

  return user ? (
    <UserDropdownInner user={user} />
  ) : (
    <Link
      href={`/login?redirect=${encodeURIComponent(path)}`}
      className="btn btn-ghost no-animation flex-nowrap">
      <Trans>Accedi</Trans> <LogIn />
    </Link>
  );
}

function UserDropdownInner({ user }: { user: User | SyncUser }) {
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
        <div className="truncate uppercase max-sm:hidden md:max-lg:hidden">{user.username}</div>
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
