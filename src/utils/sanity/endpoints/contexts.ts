import { LocaleString, SanityLinkList } from "../serializers";
import { Rolle } from "../../../types/roller";

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

export const rolleTilSanityId = {
  [Rolle.Privatperson]: "Privatperson",
  [Rolle.SelvstendigNd]: "Selvstendig næringsdrivende",
  [Rolle.Arbeidsgiver]: "Arbeidsgiver",
  [Rolle.Samarbeidspartner]: "Samarbeidspartnere"
};
