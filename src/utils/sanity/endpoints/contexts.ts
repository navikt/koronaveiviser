import { LocaleString, SanityLinkList } from "../serializers";

export type RoleContext = {
  context: LocaleString;
  order: number;
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
