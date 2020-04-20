import { Language } from "../../../types/language";
import { LocaleString } from "../common-types";

export type Frontpage = {
  pageTitle: LocaleString;
  metaDescription: LocaleString;
};

export const initialFrontpage: Frontpage = {
  pageTitle: {
    [Language.Bokmaal]: "Koronavirus - hva gjelder i min situasjon?"
  },
  metaDescription: { [Language.Bokmaal]: "" }
};
