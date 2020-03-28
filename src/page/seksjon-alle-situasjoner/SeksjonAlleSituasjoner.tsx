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

type Props = {
  kontekster: RolleKontekster;
  rolle: string;
  isLoaded: boolean;
};

const cssPrefix = "seksjon-alle-situasjoner";

export const SeksjonAlleSituasjoner = ({ kontekster, rolle, isLoaded }: Props) => {
  const aktivKontekst = kontekster.kontekster.find((kontekst) => (
    localeString(kontekst.context) === rolle
  ));

  return (
    <PanelBase className={`${cssPrefix} seksjon-panel${isLoaded ? ` seksjon-panel--loaded` : ''}`}>
      <RolleValg />
      <div className={`${cssPrefix}__fane`}>
        {aktivKontekst?.title && (
          <div className={`${cssPrefix}__fane-tittel`}>
            <Systemtittel>
              <SanityBlocks blocks={aktivKontekst.title} />
            </Systemtittel>
            <HeaderSeparator />
          </div>
        )}
        {aktivKontekst && aktivKontekst.description ? (
          <div className={`${cssPrefix}__lenkeseksjoner`}>
            {aktivKontekst?.description?.map((lenkeSeksjon, index) => (
              <LenkeSeksjon
                tittel={lenkeSeksjon.title}
                lenker={lenkeSeksjon.links}
                rolle={rolle}
                gaCategory={GACategory.AlleSituasjoner}
                key={index}
              />
            ))}
            {aktivKontekst?.info?.sections?.length > 0 &&
            <PraktiskInfoPanel praktiskInfo={aktivKontekst.info} />}
          </div>
        ) : null}
      </div>
    </PanelBase>
  );
};
