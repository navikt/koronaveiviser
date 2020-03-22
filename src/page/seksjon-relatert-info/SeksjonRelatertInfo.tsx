import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Ingress, Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import { RelatertInfo } from "../../utils/sanity/endpoints/related";
import { GACategory, triggerGaEvent } from "../../utils/react-ga";
import LenkeMedChevron from "../../components/lenke-med-chevron/LenkeMedChevron";
import { localeString } from "../../utils/localeString";

type Props = {
  relatertInfo: RelatertInfo;
  isLoaded: boolean;
};

const cssPrefix = "seksjon-relatert-info";

export const SeksjonRelatertInfo = ({ relatertInfo, isLoaded }: Props) => {
  const info = relatertInfo.info[0];

  return (
    <PanelBase className={`${cssPrefix} seksjon-panel${isLoaded ? ` seksjon-panel--loaded` : ''}`}>
      <div className={`${cssPrefix}__header`}>
        <Systemtittel>
          {info ? <SanityBlocks blocks={info.title} /> : "Relatert informasjon"}
        </Systemtittel>
      </div>
      <HeaderSeparator />
      <div className={`${cssPrefix}__innhold`}>
        {info && info.description.map((link, index) => {
          const url = localeString(link.url);
          return (
            <div className={`${cssPrefix}__lenke-container`} key={index}>
              <Ingress>
                <LenkeMedChevron
                  href={url}
                  onClick={() => triggerGaEvent(GACategory.RelatertInfo, "lenke", url)}
                >
                  <SanityBlocks blocks={link.title} />
                </LenkeMedChevron>
              </Ingress>
            </div>
          )
        })}
      </div>
    </PanelBase>
  );
};
