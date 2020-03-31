import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { LenkeSeksjon } from "../../components/lenke-seksjon/LenkeSeksjon";
import { RolleValg } from "./rollevalg/RolleValg";
import { RolleKontekster } from "../../utils/sanity/endpoints/contexts";
import { GACategory } from "../../utils/react-ga";
import { localeString } from "../../utils/localeString";
import { PraktiskInfoPanel } from "./praktisk-info/PraktiskInfoPanel";
import { Systemtittel } from "nav-frontend-typografi";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import { useStore } from "../../store/Provider";

type Props = {
  kontekster: RolleKontekster;
  rolle: string;
  isLoaded: boolean;
};

const cssPrefix = "seksjon-alle-situasjoner";

export const SeksjonAlleSituasjoner = ({ kontekster, rolle, isLoaded }: Props) => {
  const [{ praktiskInfo }] = useStore();
  const kontekst = kontekster.kontekster.find((kontekst) => (
    localeString(kontekst.context) === rolle
  ));
  const infoSeksjoner = kontekst?.infoRefs?.map(infoRef =>
    praktiskInfo.info[infoRef._ref]);

  return (
    <PanelBase className={`${cssPrefix} seksjon-panel${isLoaded ? ` seksjon-panel--loaded` : ''}`}>
      <RolleValg />
      <div className={`${cssPrefix}__fane`}>
        {kontekst?.title && (
          <div className={`${cssPrefix}__fane-tittel`}>
            <Systemtittel>
              <SanityBlocks blocks={kontekst.title} />
            </Systemtittel>
            <HeaderSeparator />
          </div>
        )}
        {kontekst && kontekst.description ? (
          <div className={`${cssPrefix}__lenkeseksjoner`}>
            {kontekst?.description?.map((lenkeSeksjon, index) => (
              <LenkeSeksjon
                tittel={lenkeSeksjon.title}
                lenker={lenkeSeksjon.links}
                rolle={rolle}
                gaCategory={GACategory.AlleSituasjoner}
                key={index}
              />
            ))}
            {infoSeksjoner && <PraktiskInfoPanel praktiskInfo={infoSeksjoner} />}
          </div>
        ) : null}
      </div>
    </PanelBase>
  );
};
