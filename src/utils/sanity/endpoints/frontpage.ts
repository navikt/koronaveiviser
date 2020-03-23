import { LocaleBlock, LocaleString } from "../serializers";
import { Language } from "../../../types/language";

export type Frontpage = {
  pageTitle: LocaleString;
  metaDescription?: LocaleBlock;
};

export const initialFrontpage: Frontpage = {
  pageTitle: {[Language.Bokmaal]: "Koronavirus - hva gjelder i min situasjon?"},
};
