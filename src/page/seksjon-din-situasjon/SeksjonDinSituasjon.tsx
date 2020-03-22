import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import Lenkepanel from "nav-frontend-lenkepanel/lib";
import { DinSituasjon } from "../../utils/sanity/endpoints/your-situation";
import { Language } from "../../utils/sanity/serializers";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";

type Props = {
  dinSituasjon: DinSituasjon;
  isLoaded: boolean;
};

const cssPrefix = "seksjon-din-situasjon";

export const SeksjonDinSituasjon = ({ dinSituasjon, isLoaded }: Props) => {
  const situasjoner = dinSituasjon.situasjoner[0];

  return (
    <PanelBase className={`${cssPrefix}${isLoaded ? ` ${cssPrefix}--loaded` : ''}`}>
      <div className={`${cssPrefix}__header`}>
        <Systemtittel>
          {situasjoner ? <SanityBlocks blocks={situasjoner.title}/> : "Hva er din situasjon?"}
        </Systemtittel>
      </div>
      <HeaderSeparator />
      <div className={`${cssPrefix}__innhold`}>
        {situasjoner && situasjoner.links.map((lenke, index) => {
          const url = (lenke.url && lenke.url[Language.Bokmaal]) || "#";
          return (
            <Lenkepanel href={url} tittelProps={"undertittel"} border={true} key={index}>
              <SanityBlocks blocks={lenke.title} />
            </Lenkepanel>
          );
        })}
      </div>
    </PanelBase>
  );
};
