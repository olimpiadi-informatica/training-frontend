import { SelectField } from "@olinfo/react-components";
import { sortBy } from "lodash-es";
import useSWR from "swr";

import type { Location } from "~/lib/location";

type Props = {
  label: string;
  field: string;
  placeholder: string;
  id?: string;
  fetcher: (id: string) => Promise<Location[]>;
  optional?: boolean;
};

export function LocationField({ label, field, placeholder, id, fetcher, optional }: Props) {
  const { data, isLoading } = useSWR<Location[], Error, [string, string] | undefined>(
    id ? [`locations/${field}`, id] : undefined,
    ([, id]) => fetcher(id.trim()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );

  const options = Object.fromEntries(
    sortBy(data, "name").map((location) => [`${location.id} `, location.name]),
  );

  return (
    <SelectField
      label={label}
      field={field}
      placeholder={placeholder}
      options={options}
      disabled={!id || isLoading}
      optional={optional}
    />
  );
}
