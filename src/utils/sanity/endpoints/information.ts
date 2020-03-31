import { LocaleBlock, LocaleString } from "../common-types";

export type Information = {
  _id: string;
  title: LocaleString;
  description: LocaleBlock;
  anchor?: string;
};

export type PraktiskInfo = {
  isLoaded: boolean;
  info: { [id: string]: Information };
};

export const initialInformation = {
  isLoaded: false,
  info: {}
};
