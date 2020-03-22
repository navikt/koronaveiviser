import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import Lenkepanel from "nav-frontend-lenkepanel/lib";
import { DinSituasjon } from "../../utils/sanity/endpoints/your-situation";
import { Language } from "../../utils/sanity/serializers";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import { GACategory, triggerGaEvent } from "../../utils/react-ga";

type Props = {
  dinSituasjon: DinSituasjon;
  isLoaded: boolean;
};

const cssPrefix = "seksjon-din-situasjon";

export const SeksjonDinSituasjon = ({ dinSituasjon, isLoaded }: Props) => {
  const situasjoner = dinSituasjon.situasjoner[0];

  return (
    <PanelBase className={`${cssPrefix} seksjon-panel${isLoaded ? ` seksjon-panel--loaded` : ''}`}>
      <div className={`${cssPrefix}__header`}>
        <Systemtittel>
          {situasjoner ? <SanityBlocks blocks={situasjoner.title} /> : "Hva er din situasjon?"}
        </Systemtittel>
      </div>
      <HeaderSeparator />
      <div className={`${cssPrefix}__innhold`}>
        {situasjoner && situasjoner.links.map((lenke, index) => {
          const url = (lenke.url && lenke.url[Language.Bokmaal]) || "#";
          return (
            <Lenkepanel
              href={url}
              tittelProps={"undertittel"}
              border={true}
              onClick={() => {
                triggerGaEvent(
                  GACategory.DinSituasjon,
                  lenke.title[Language.Bokmaal],
                  url
                )
              }}
              key={index}
            >
              <SanityBlocks blocks={lenke.title} />
            </Lenkepanel>
          );
        })}
      </div>
    </PanelBase>
  );
};
