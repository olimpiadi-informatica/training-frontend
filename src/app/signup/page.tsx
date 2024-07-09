"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  EmailField,
  FirstNameField,
  Form,
  FormFieldError,
  LastNameField,
  NewPasswordField,
  SubmitButton,
  UsernameField,
} from "@olinfo/react-components";
import {
  Contest,
  getCities,
  getContest,
  getInstitutes,
  getProvinces,
  getRegions,
  signup,
} from "@olinfo/training-api";
import ReCaptchaWidget, { ReCAPTCHA } from "react-google-recaptcha";
import useSWR, { useSWRConfig } from "swr";

import { H1, H2 } from "~/components/header";
import { LocationField } from "~/components/location-field";
import { useTheme } from "~/lib/theme";

type FormValue = {
  email: string;
  username: string;
  password: string;
  name: string;
  surname: string;
  region: string;
  province: string;
  city: string;
  institute: string;
};

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { _ } = useLingui();

  const { data: contest } = useSWR<Contest, Error>("api/contest", getContest, {
    revalidateIfStale: false,
  });

  const captchaRef = useRef<ReCAPTCHA>(null);

  const submit = async (user: FormValue) => {
    try {
      await signup(
        user.email,
        user.username,
        user.password,
        user.name,
        user.surname,
        user.institute,
        captchaRef.current?.getValue() ?? undefined,
      );
    } catch (err) {
      switch ((err as Error).message) {
        case "Username is invalid":
          throw new FormFieldError("username", _(msg`Username non valido`));
        case "This username is not available":
          throw new FormFieldError("username", _(msg`Username non disponibile`));
        case "Invalid e-mail":
          throw new FormFieldError("email", _(msg`Email non valida`));
        case "E-mail already used":
          throw new FormFieldError("email", _(msg`Email già in uso`));
        default:
          throw err;
      }
    }
    await mutate("api/me");
    router.push("/");
    router.refresh();
    await new Promise(() => {});
  };

  return (
    <Form onSubmit={submit}>
      <H1>
        <Trans>Crea un nuovo account</Trans>
      </H1>
      <EmailField field="email" />
      <UsernameField field="username" minLength={4} />
      <NewPasswordField field="password" minLength={8} />
      <H2 className="mt-8">
        <Trans>Anagrafica</Trans>
      </H2>
      <FirstNameField field="name" />
      <LastNameField field="surname" />
      <H2 className="mt-8">
        <Trans>Scuola di provenienza (opzionale)</Trans>
      </H2>
      <LocationField
        label={_(msg`Regione`)}
        field="region"
        placeholder={_(msg`Scegli la regione`)}
        id="🇮🇹"
        fetcher={getRegions}
        optional
      />
      {({ region }) => (
        <LocationField
          label={_(msg`Provincia`)}
          field="province"
          placeholder={_(msg`Scegli la provincia`)}
          id={region}
          fetcher={getProvinces}
          optional
        />
      )}
      {({ province }) => (
        <LocationField
          label={_(msg`Comune`)}
          field="city"
          placeholder={_(msg`Scegli il comune`)}
          id={province}
          fetcher={getCities}
          optional
        />
      )}
      {({ city }) => (
        <LocationField
          label={_(msg`Istituto`)}
          field="institute"
          placeholder={_(msg`Scegli la scuola`)}
          id={city}
          fetcher={getInstitutes}
          optional
        />
      )}
      {contest?.captcha_enabled && (
        <div className="mx-auto mt-4 h-20">
          {theme && (
            <ReCaptchaWidget
              ref={captchaRef}
              theme={theme}
              className="h-[76px] w-[302px] overflow-hidden rounded-[3px]"
              sitekey={
                process.env.NODE_ENV === "production"
                  ? contest.recaptcha_public_key
                  : "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              }
            />
          )}
        </div>
      )}
      <SubmitButton>
        <Trans>Crea</Trans>
      </SubmitButton>
    </Form>
  );
}
