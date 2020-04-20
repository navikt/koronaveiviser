import { Language } from "../../types/language";

export enum TypoStyle {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  Normal = "normal"
}

export type TextBlock = {
  node: { style: TypoStyle };
  children: JSX.Element[];
};

export type SanityLink = {
  title: LocaleString;
  url: LocaleUrl;
};

export type SanityLinkList = {
  title: LocaleString;
  links: SanityLink[];
};

export type LocaleBlock = { [key in Language]: TextBlock };

export type LocaleString = { [key in Language]: string };

export type LocaleUrl = { [key in Language]: string };

export type SanityAnchor = {
  current: string;
}


