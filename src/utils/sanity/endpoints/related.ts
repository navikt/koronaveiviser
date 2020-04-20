import { LocaleString, SanityLink } from "../common-types";

export type RelatedInfo = {
  description: SanityLink[];
  title?: LocaleString;
  _updatedAt?: string;
};

export type RelatertInfo = {
  isLoaded: boolean;
  info: RelatedInfo[];
};

export const initialRelatertInfo = {
  isLoaded: false,
  info: []
};
