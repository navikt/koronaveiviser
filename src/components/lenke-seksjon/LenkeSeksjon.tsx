import React from 'react';
import { Undertittel } from "nav-frontend-typografi";
import LenkeMedChevron from "../lenke-med-chevron/LenkeMedChevron";
import { Language, LocaleString, SanityLink } from "../../utils/sanity/serializers";
import { SanityBlocks } from "../sanity-blocks/SanityBlocks";

type Props = {
  tittel: LocaleString;
  lenker: SanityLink[];
}

const cssPrefix = "lenke-seksjon";

export const LenkeSeksjon = ({ tittel, lenker }: Props) => {

  return (
    <div className={cssPrefix}>
      <div className={`${cssPrefix}__tittel`}>
        <Undertittel>
          <SanityBlocks blocks={tittel} />
        </Undertittel>
      </div>
      <div className={`${cssPrefix}__lenker`}>
        {lenker.map((lenke, index) => (
          <LenkeMedChevron href={lenke.url[Language.Bokmaal]} key={index}>
            <SanityBlocks blocks={lenke.title} />
          </LenkeMedChevron>
        ))}
      </div>
    </div>
  );
};
