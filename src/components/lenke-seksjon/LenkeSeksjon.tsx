import React from 'react';
import { Undertittel } from "nav-frontend-typografi";
import LenkeMedChevron from "../lenke-med-chevron/LenkeMedChevron";
import { Language, LocaleString, SanityLink } from "../../utils/sanity/serializers";
import { SanityBlocks } from "../sanity-blocks/SanityBlocks";
import { GACategory, triggerGaEvent } from "../../utils/react-ga";

type Props = {
  tittel: LocaleString;
  lenker: SanityLink[];
  rolle: string;
  gaCategory?: GACategory;
}

const cssPrefix = "lenke-seksjon";

export const LenkeSeksjon = ({ tittel, lenker, rolle, gaCategory = GACategory.Andre }: Props) => {
  return (
    <div className={cssPrefix}>
        <div className={`${cssPrefix}__tittel`}>
        <Undertittel>
          <SanityBlocks blocks={tittel} />
        </Undertittel>
      </div>
      <div className={`${cssPrefix}__lenker`}>
        {lenker.map((lenke, index) => {
          const url = (lenke.url && lenke.url[Language.Bokmaal]) || "";
          return (
            <LenkeMedChevron
              href={url}
              key={index}
              onClick={() => {
                triggerGaEvent(
                  gaCategory,
                  `${rolle}/${tittel[Language.Bokmaal]}`,
                  url
                )}}
            >
              <SanityBlocks blocks={lenke.title} />
            </LenkeMedChevron>
          )
        })}
      </div>
    </div>
  );
};
