"use client";

import { useRouter } from "next/navigation";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
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
  const { _ } = useLingui();

  const submit = async (data: Institute) => {
    await changeSchool(data.institute);
    await mutate("api/me");
    await mutate(["api/user", username]);
    router.push(`/user/${username}`);
    router.refresh();
    notifySuccess(_(msg`Scuola cambiata con successo`));
    await new Promise(() => {});
  };

  return (
    <Form onSubmit={submit}>
      <H2 className="mt-8">
        <Trans>Scuola di provenienza</Trans>
      </H2>
      <LocationField
        label={_(msg`Regione`)}
        field="region"
        placeholder={_(msg`Scegli la regione`)}
        id="🇮🇹"
        fetcher={getRegions}
      />
      {({ region }) => (
        <LocationField
          label={_(msg`Provincia`)}
          field="province"
          placeholder={_(msg`Scegli la provincia`)}
          id={region}
          fetcher={getProvinces}
        />
      )}
      {({ province }) => (
        <LocationField
          label={_(msg`Comune`)}
          field="city"
          placeholder={_(msg`Scegli il comune`)}
          id={province}
          fetcher={getCities}
        />
      )}
      {({ city }) => (
        <LocationField
          label={_(msg`Istituto`)}
          field="institute"
          placeholder={_(msg`Scegli la scuola`)}
          id={city}
          fetcher={getInstitutes}
        />
      )}
      <SubmitButton>
        <Trans>Cambia scuola</Trans>
      </SubmitButton>
    </Form>
  );
}
