import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import Lenkepanel from "nav-frontend-lenkepanel/lib";
import { DinSituasjon } from "../../utils/sanity/endpoints/your-situation";
import { Language } from "../../utils/sanity/serializers";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";

const cssPrefix = "seksjon-din-situasjon";

type Props = {
  dinSituasjon: DinSituasjon;
};

export const SeksjonDinSituasjon = ({ dinSituasjon }: Props) => {
  const situasjoner = dinSituasjon.situasjoner[0];

  if (!situasjoner) {
    return null;
  }

  return (
    <PanelBase className={cssPrefix}>
      <div className={`${cssPrefix}__header`}>
        <Systemtittel>
          <SanityBlocks blocks={situasjoner.title} />
        </Systemtittel>
      </div>
      <HeaderSeparator />
      <div className={`${cssPrefix}__innhold`}>
        {situasjoner.links.map((lenke, index) => {
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
