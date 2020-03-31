import { LocaleString, SanityLinkList } from "../serializers";
import { SanityAnchor } from "../common-types";

export type RoleContext = {
  title?: LocaleString;
  context: LocaleString;
  order: number;
  infoRefs?: InfoRef[];
  description?: SanityLinkList[];
  anchor?: SanityAnchor;
};

export type RolleKontekster = {
  isLoaded: boolean;
  kontekster: RoleContext[];
};

export const initialRolleKontekster = {
  isLoaded: false,
  kontekster: []
};

type InfoRef = {
  ref: SanityRef;
  anchor?: SanityAnchor;
}

type SanityRef = {
  _ref: string
}
