import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

import { Card } from "@olinfo/react-components";
import { map, mapValues } from "lodash-es";

import { type Badge, useUserBadges } from "~/lib/algobadge";

import { type Users, badgeName } from "./common";
import { SummaryBadges } from "./summary-badges";
import { SummaryCategories } from "./summary-categories";
import { SummaryTotal } from "./summary-total";

export function Summary({ usernames }: { usernames: string[] }) {
  const [users, setUsers] = useState<Users>({});

  const download = async () => {
    const userBadges = mapValues(users, (badges) =>
      badges
        ? {
            total: badgeName[Math.min(...map(badges, "badge")) as Badge],
            ...mapValues(badges, ({ badge }) => badgeName[badge]),
          }
        : null,
    );

    try {
      const handle = await window.showSaveFilePicker({ suggestedName: "algobadge.json" });
      const writable = await handle.createWritable();
      await writable.write(JSON.stringify(userBadges));
    } catch (err) {
      throw new Error(
        window.location.protocol !== "https:" && window.location.hostname !== "localhost"
          ? "Devi usare HTTPS per scaricare il file."
          : "Browser non supportato. Usa Chrome o Edge.",
        { cause: err },
      );
    }
  };

  return (
    <Card className="flex-wrap p-4 *:basis-full justify-between">
      <div className="md:basis-4/12 lg:basis-3/12">
        <h2 className="text-center text-2xl">Totale</h2>
        <SummaryTotal users={users} />
      </div>
      <div className="md:basis-7/12 lg:basis-4/12">
        <h2 className="text-center text-2xl">Badge</h2>
        <SummaryBadges users={users} />
      </div>
      <div className="lg:basis-5/12">
        <h2 className="text-center text-2xl">Categorie</h2>
        <SummaryCategories users={users} />
      </div>
      <div className="my-4 grid justify-center">
        <button className="btn btn-primary" onClick={download} type="button">
          Scarica dati
        </button>
      </div>
      {usernames.map((username) => (
        <UserEntry key={username} username={username} setUsers={setUsers} />
      ))}
    </Card>
  );
}

function UserEntry({
  username,
  setUsers,
}: {
  username: string;
  setUsers: Dispatch<SetStateAction<Users>>;
}) {
  const { badges, isLoading } = useUserBadges(username, true);

  useEffect(() => {
    setUsers((prev) => ({
      ...prev,
      [username]: isLoading ? undefined : badges ?? null,
    }));
    return () => setUsers(({ [username]: _user, ...users }) => users);
  }, [isLoading, badges, setUsers, username]);

  return null;
}
