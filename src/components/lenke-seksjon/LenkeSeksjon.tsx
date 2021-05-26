import React from 'react';
import { Undertittel } from "nav-frontend-typografi";
import LenkeMedChevron from "../lenke-med-chevron/LenkeMedChevron";
import { SanityBlocks } from "../sanity-blocks/SanityBlocks";
import { AnalyticsCategory, triggerAnalyticsEvent } from "../../utils/amplitude";
import { localeString } from "../../utils/sanity/localeString";
import { LocaleString, SanityLink } from "../../utils/sanity/common-types";

type Props = {
  tittel: LocaleString;
  lenker: SanityLink[];
  rolle: string;
  gaCategory?: AnalyticsCategory;
}

const cssPrefix = "lenke-seksjon";

export const LenkeSeksjon = ({ tittel, lenker, rolle, gaCategory = AnalyticsCategory.Andre }: Props) => {
  return (
    <div className={cssPrefix}>
      <div className={`${cssPrefix}__tittel`}>
        <Undertittel tag="h3">
          <SanityBlocks blocks={tittel} />
        </Undertittel>
      </div>
      <div className={`${cssPrefix}__lenker`}>
        {lenker.map((lenke, index) => {
          const url = localeString(lenke.url);
          return (
            <LenkeMedChevron
              href={url}
              key={index}
              onClick={() => {
                triggerAnalyticsEvent(
                  gaCategory,
                  `${rolle}/${localeString(tittel)}`,
                  url
                )
              }}
            >
              {localeString(lenke.title)}
            </LenkeMedChevron>
          )
        })}
      </div>
    </div>
  );
};
