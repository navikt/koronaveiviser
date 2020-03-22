import { LocaleString, SanityLinkList } from "../serializers";

export type RoleContext = {
  context: LocaleString;
  description?: SanityLinkList[];
};

export type RolleKontekster = {
  isLoaded: boolean;
  kontekster: RoleContext[];
}

export const initialRolleKontekster = {
  isLoaded: false,
  kontekster: [],
};
