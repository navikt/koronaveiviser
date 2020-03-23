import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import { PraktiskInfo } from "../../utils/sanity/endpoints/information";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { seksjonIds } from "../Page";

type Props = {
  praktiskInfo: PraktiskInfo;
  isLoaded: boolean;
};

const cssPrefix = "seksjon-praktisk-info";

export const SeksjonPraktiskInfo = ({ praktiskInfo, isLoaded }: Props) => {
  const info = praktiskInfo.info[0];

  return (
    <PanelBase className={`${cssPrefix} seksjon-panel${isLoaded ? ` seksjon-panel--loaded` : ''}`}>
      <div className={`${cssPrefix}__header`} id={seksjonIds[3]}>
        <Systemtittel>
          {info ? <SanityBlocks blocks={info.title} /> : "Praktisk informasjon"}
        </Systemtittel>
      </div>
      <HeaderSeparator />
      <div className={`${cssPrefix}__innhold`}>
        {info && info.sections.map((section, index) => (
          <div className={`${cssPrefix}__section`}>
            <Ekspanderbartpanel tittel={<SanityBlocks blocks={section.title} key={index} />}>
              <div className={`${cssPrefix}__panel-innhold`}>
                <SanityBlocks blocks={section.description} />
              </div>
            </Ekspanderbartpanel>
          </div>
        ))}
      </div>
    </PanelBase>
  );
};
