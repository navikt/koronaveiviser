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
import { AnalyticsCategory, triggerAnalyticsEvent } from "../amplitude";
import { localeString } from "./localeString";
import { defaultLang } from "../../types/language";
import {
  LocaleBlock,
  LocaleString,
  TextBlock,
  TypoStyle
} from "./common-types";

const typoComponents = {
  [TypoStyle.H1]: Sidetittel,
  [TypoStyle.H2]: Innholdstittel,
  [TypoStyle.H3]: Systemtittel,
  [TypoStyle.H4]: Undertittel,
  [TypoStyle.H5]: Ingress,
  [TypoStyle.H6]: Element,
  [TypoStyle.Normal]: Normaltekst
};

type LinkMark = {
  mark: { href: string };
  children: any;
};

const localeStringSerializer = (block: { node: LocaleString }) => {
  return localeString(block.node);
};

const localeBlockSerializer = (block: { node: LocaleBlock }) => {
  const blocks = block.node[defaultLang];
  return blocks ? (
    <BlockContent blocks={blocks} serializers={serializers} />
  ) : null;
};

const blockSerializer = (block: TextBlock) => {
  const TypoComponent =
    typoComponents[block.node.style] || typoComponents[TypoStyle.Normal];
  return (
    <div className={"block"}>
      <TypoComponent>{block.children}</TypoComponent>
    </div>
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
      onClick={() =>
        triggerAnalyticsEvent(AnalyticsCategory.PraktiskInfo, "lenke", mark.mark.href)
      }
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
    block: blockSerializer
  },
  marks: {
    link: linkMarkSerializer
  }
};
