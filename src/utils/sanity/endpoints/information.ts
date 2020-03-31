import { LocaleBlock, LocaleString } from "../serializers";

export type Information = {
  _id: string;
  title: LocaleString;
  description: LocaleBlock;
  anchor?: { current: string };
};

export type PraktiskInfo = {
  isLoaded: boolean;
  info: { [id: string]: Information };
};

export const initialInformation = {
  isLoaded: false,
  info: {}
};
