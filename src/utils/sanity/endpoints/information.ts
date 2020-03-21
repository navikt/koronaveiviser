import { LocaleString, TextBlockWithTitle } from "../serializers";

export type Information = {
  sections: TextBlockWithTitle[];
  title?: LocaleString;
  _updatedAt?: string;
};

export type PraktiskInfo = {
  isLoaded: boolean;
  info: Information[];
}

export const initialInformation = {
  isLoaded: false,
  info: [],
};
