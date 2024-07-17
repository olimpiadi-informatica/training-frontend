"use client";

import { useRouter } from "next/navigation";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@olinfo/react-components";
import clsx from "clsx";
import { ChevronDown, Languages } from "lucide-react";

export function LocaleDropdown() {
  const router = useRouter();
  const { i18n, _ } = useLingui();

  const changeLanguage = (lang: string) => {
    document.cookie = `lang=${lang}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <Dropdown className="dropdown-end">
      <DropdownButton className="gap-1" ariaLabel={_(msg`Cambia lingua`)}>
        <Languages size={20} />
        <ChevronDown size={18} strokeWidth={2.5} />
      </DropdownButton>
      <DropdownMenu>
        <DropdownItem>
          <button
            className={clsx(i18n.locale === "it" && "active")}
            onClick={() => changeLanguage("it")}
            type="button">
            &#127470;&#127481; Italiano
          </button>
        </DropdownItem>
        <DropdownItem>
          <button
            className={clsx(i18n.locale === "en" && "active")}
            onClick={() => changeLanguage("en")}
            type="button">
            &#127468;&#127463; English
          </button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
