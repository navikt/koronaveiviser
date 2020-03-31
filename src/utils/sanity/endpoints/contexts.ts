import { LocaleString, SanityLinkList } from "../serializers";

export type RoleContext = {
  title?: LocaleString;
  context: LocaleString;
  order: number;
  infoRefs?: SanityRef[];
  description?: SanityLinkList[];
  anchor?: { current: string };
};

export type RolleKontekster = {
  isLoaded: boolean;
  kontekster: RoleContext[];
};

export const initialRolleKontekster = {
  isLoaded: false,
  kontekster: []
};

type SanityRef = {
  _ref: string
}
