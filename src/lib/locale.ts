import { cookies } from "next/headers";

import { type I18n, setupI18n } from "@lingui/core";
import { setI18n } from "@lingui/react/server";

const locales = {
  en: () => import("~/locales/en/messages.mjs"),
  it: () => import("~/locales/it/messages.mjs"),
};

export async function loadLocale(): Promise<I18n> {
  let locale = cookies().get("lang")?.value ?? "";
  if (!(locale in locales)) {
    locale = "it";
  }

  const { messages } = await locales[locale as keyof typeof locales]();
  const i18n = setupI18n({ locale, messages: { [locale]: messages } });
  setI18n(i18n);

  return i18n;
}
