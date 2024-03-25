"use client";

import { useRouter } from "next/navigation";

import { Form, SubmitButton, useNotifications } from "@olinfo/react-components";
import {
  changeSchool,
  getCities,
  getInstitutes,
  getProvinces,
  getRegions,
} from "@olinfo/training-api";
import { useSWRConfig } from "swr";

import { H2 } from "~/components/header";
import { LocationField } from "~/components/location-field";

type Props = {
  params: { username: string };
};

type Institute = {
  region: string;
  province: string;
  city: string;
  institute: string;
};

export default function Page({ params: { username } }: Props) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { notifySuccess } = useNotifications();

  const submit = async (data: Institute) => {
    await changeSchool(data.institute);
    await mutate("api/me");
    await mutate(["api/user", username]);
    router.push(`/user/${username}`);
    router.refresh();
    notifySuccess("Scuola cambiata con successo");
  };

  return (
    <Form onSubmit={submit}>
      <H2 className="mt-8">Scuola di provenienza</H2>
      <LocationField
        label="Regione"
        field="region"
        placeholder="Scegli la regione"
        id="🇮🇹"
        fetcher={getRegions}
      />
      {({ region }) => (
        <LocationField
          label="Provincia"
          field="province"
          placeholder="Scegli la provincia"
          id={region}
          fetcher={getProvinces}
        />
      )}
      {({ province }) => (
        <LocationField
          label="Comune"
          field="city"
          placeholder="Scegli il comune"
          id={province}
          fetcher={getCities}
        />
      )}
      {({ city }) => (
        <LocationField
          label="Istituto"
          field="institute"
          placeholder="Scegli la scuola"
          id={city}
          fetcher={getInstitutes}
        />
      )}
      <SubmitButton>Cambia scuola</SubmitButton>
    </Form>
  );
}
