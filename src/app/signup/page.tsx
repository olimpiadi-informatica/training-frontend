"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
          throw new FormFieldError("username", "Username non valido");
        case "This username is not available":
          throw new FormFieldError("username", "Username non disponibile");
        case "Invalid e-mail":
          throw new FormFieldError("email", "E-mail non valida");
        case "E-mail already used":
          throw new FormFieldError("email", "E-mail già in uso");
        default:
          throw err;
      }
    }
    await mutate("api/me");
    router.push("/");
    router.refresh();
  };

  return (
    <Form onSubmit={submit}>
      <H1>Crea un account</H1>
      <EmailField field="email" />
      <UsernameField field="username" minLength={4} />
      <NewPasswordField field="password" minLength={8} />
      <H2 className="mt-8">Anagrafica</H2>
      <FirstNameField field="name" />
      <LastNameField field="surname" />
      <H2 className="mt-8">Scuola di provenienza (opzionale)</H2>
      <LocationField
        label="Regione"
        field="region"
        placeholder="Scegli la regione"
        id="🇮🇹"
        fetcher={getRegions}
        optional
      />
      {({ region }) => (
        <LocationField
          label="Provincia"
          field="province"
          placeholder="Scegli la provincia"
          id={region}
          fetcher={getProvinces}
          optional
        />
      )}
      {({ province }) => (
        <LocationField
          label="Comune"
          field="city"
          placeholder="Scegli il comune"
          id={province}
          fetcher={getCities}
          optional
        />
      )}
      {({ city }) => (
        <LocationField
          label="Istituto"
          field="institute"
          placeholder="Scegli la scuola"
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
      <SubmitButton>Crea</SubmitButton>
    </Form>
  );
}

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">();

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(media.matches ? "dark" : "light");

    media.addEventListener("change", updateTheme);
    return () => media.removeEventListener("change", updateTheme);

    function updateTheme(e: MediaQueryListEvent) {
      setTheme(e.matches ? "dark" : "light");
    }
  }, []);

  return theme;
}
