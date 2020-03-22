import {
  Element,
  Ingress,
  Innholdstittel,
  Normaltekst,
  Sidetittel,
  Systemtittel,
  Undertittel
} from "nav-frontend-typografi";
import { Alert } from "./endpoints/alert";
import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import { Varsel } from "../../components/varsler/Varsel";
import Lenke from "nav-frontend-lenker";
import { GACategory, triggerGaEvent } from "../react-ga";
import { localeString } from "../localeString";
import { defaultLang, Language } from "../../types/language";

enum TypoStyle {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  Normal = "normal",
}

const typoComponents = {
  [TypoStyle.H1]: Sidetittel,
  [TypoStyle.H2]: Innholdstittel,
  [TypoStyle.H3]: Systemtittel,
  [TypoStyle.H4]: Undertittel,
  [TypoStyle.H5]: Ingress,
  [TypoStyle.H6]: Element,
  [TypoStyle.Normal]: Normaltekst
};

export type TextBlock = {
  node: { style: TypoStyle };
  children: React.ReactElement[];
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

export type TextBlockWithTitle = {
  title: LocaleString;
  description: LocaleBlock;
};

export type LinkMark = {
  mark: { href: string };
  children: any;
}

const localeStringSerializer = (block: { node: LocaleString }) => {
  return localeString(block.node);
};

const localeBlockSerializer = (block: { node: LocaleBlock }) => {
  const blocks = block.node[defaultLang];
  return blocks ? <BlockContent blocks={blocks} serializers={serializers} /> : null;
};

const blockSerializer = (block: TextBlock) => {
  const TypoComponent = typoComponents[block.node.style] || typoComponents[TypoStyle.Normal];
  return (
    <TypoComponent>
      {block.children}
    </TypoComponent>
  );
};

const alertSerializer = (props: any) => {
  const alert = props.node as Alert;
  return (
    <Varsel type={alert.type} lastUpdate={alert._updatedAt}>
      <SanityBlocks blocks={alert.description} />
    </Varsel>
  );
};

const linkMarkSerializer = (mark: LinkMark) => {
  return (
    <Lenke
      href={mark.mark.href}
      onClick={() => triggerGaEvent(GACategory.PraktiskInfo, "lenke", mark.mark.href)}
    >
      {mark.children}
    </Lenke>
  );
};

export const serializers = {
  types: {
    alert: alertSerializer,
    localeBlock: localeBlockSerializer,
    localeString: localeStringSerializer,
    block: blockSerializer,
  },
  marks: {
    link: linkMarkSerializer,
  }
};
