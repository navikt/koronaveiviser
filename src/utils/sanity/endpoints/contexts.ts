import { LocaleString, SanityLinkList, TextBlockWithTitle } from "../serializers";

export type RoleContext = {
  title: LocaleString;
  context: LocaleString;
  order: number;
  info: Information;
  description?: SanityLinkList[];
  anchor?: { current: string };
};

export type Information = {
  sections: TextBlockWithTitle[];
  title?: LocaleString;
  _updatedAt?: string;
};

export type RolleKontekster = {
  isLoaded: boolean;
  kontekster: RoleContext[];
};

export const initialRolleKontekster = {
  isLoaded: false,
  kontekster: []
};
