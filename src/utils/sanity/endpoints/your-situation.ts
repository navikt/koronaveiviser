import { LocaleString, SanityLink } from "../serializers";

export type YourSituation = {
  links: SanityLink[];
  title?: LocaleString;
};

export type DinSituasjon = {
  isLoaded: boolean;
  situasjoner: YourSituation[];
}

export const initialDinSituasjon = {
  isLoaded: false,
  situasjoner: [],
};
