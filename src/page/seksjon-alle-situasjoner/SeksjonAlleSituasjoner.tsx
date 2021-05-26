import React from "react";
import PanelBase from "nav-frontend-paneler";
import { LenkeSeksjon } from "../../components/lenke-seksjon/LenkeSeksjon";
import { RolleValg } from "./rollevalg/RolleValg";
import { RolleKontekster } from "../../utils/sanity/endpoints/contexts";
import { AnalyticsCategory } from "../../utils/amplitude";
import { localeString } from "../../utils/sanity/localeString";
import { PraktiskInfoPanel } from "./praktisk-info/PraktiskInfoPanel";
import { Systemtittel } from "nav-frontend-typografi";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import { useStore } from "../../store/Provider";
import { Information } from "../../utils/sanity/endpoints/information";

type Props = {
  kontekster: RolleKontekster;
  isLoaded: boolean;
};

const cssPrefix = "seksjon-alle-situasjoner";

export const SeksjonAlleSituasjoner = ({ kontekster, isLoaded }: Props) => {
  const [{ praktiskInfo, rollevalg }] = useStore();
  const kontekst = kontekster.kontekster.find(
    kontekst => localeString(kontekst.context) === rollevalg
  );
  const infoSeksjoner = kontekst?.inforefs?.reduce((acc, infoRef) => {
    const idFromRef = infoRef.ref._ref;
    const anchor = infoRef.anchor?.current;
    const infoSeksjon = praktiskInfo.info[idFromRef];
    return infoSeksjon ? acc.concat([{ ...infoSeksjon, anchor: anchor }]) : acc;
  }, [] as Information[]);

  return (
    <PanelBase
      className={`${cssPrefix} seksjon-panel${
        isLoaded ? ` seksjon-panel--loaded` : ""
      }`}
    >
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
        {kontekst?.description ? (
          <div className={`${cssPrefix}__lenkeseksjoner`}>
            {kontekst?.description?.map((lenkeSeksjon, index) => (
              <LenkeSeksjon
                tittel={lenkeSeksjon.title}
                lenker={lenkeSeksjon.links}
                rolle={rollevalg}
                gaCategory={AnalyticsCategory.AlleSituasjoner}
                key={index}
              />
            ))}
          </div>
        ) : null}
        {infoSeksjoner && infoSeksjoner.length > 0 && (
          <PraktiskInfoPanel
            praktiskInfo={infoSeksjoner}
            tittel={kontekst?.infotitle}
          />
        )}
      </div>
    </PanelBase>
  );
};
