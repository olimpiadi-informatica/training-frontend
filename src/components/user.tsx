import { ReactNode, createContext, useContext } from "react";

import { User as TerryUser } from "@olinfo/terry-api";
import { SyncUser, User } from "@olinfo/training-api";

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
