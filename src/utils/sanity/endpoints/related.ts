import { LocaleString, SanityLink } from "../serializers";

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
