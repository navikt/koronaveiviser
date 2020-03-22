import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import { LenkeSeksjon } from "../../components/lenke-seksjon/LenkeSeksjon";
import { RolleValg } from "./RolleValg";
import { RolleKontekster } from "../../utils/sanity/endpoints/contexts";
import { Language } from "../../utils/sanity/serializers";
import { GACategory } from "../../utils/react-ga";

type Props = {
  rolleKontekst: RolleKontekster;
  rolle: string;
  isLoaded: boolean;
};

const cssPrefix = "seksjon-alle-situasjoner";

export const SeksjonAlleSituasjoner = ({ rolleKontekst, rolle, isLoaded }: Props) => {
  const lenkerForKontekst = rolleKontekst.kontekster.find((kontekst) => (
    kontekst.context[Language.Bokmaal] === rolle
  ));

  return (
    <PanelBase className={`${cssPrefix} seksjon-panel${isLoaded ? ` seksjon-panel--loaded` : ''}`}>
      <div className={`${cssPrefix}__header`}>
        <Systemtittel>
          {"Alle situasjoner"}
        </Systemtittel>
      </div>
      <HeaderSeparator />
      <RolleValg />
      {lenkerForKontekst && lenkerForKontekst.description ? (
        <div className={`${cssPrefix}__lenkeseksjoner`}>
          {lenkerForKontekst.description.map((lenkeSeksjon, index) => (
            <LenkeSeksjon
              tittel={lenkeSeksjon.title}
              lenker={lenkeSeksjon.links}
              rolle={rolle}
              gaCategory={GACategory.AlleSituasjoner}
              key={index}
            />
          ))}
        </div>
      ) : null}
    </PanelBase>
  );
};
