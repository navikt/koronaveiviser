import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import { LenkeSeksjon } from "../../components/lenke-seksjon/LenkeSeksjon";
import { RolleValg } from "./RolleValg";
import { RolleKontekster, rolleTilSanityId } from "../../utils/sanity/endpoints/contexts";
import { Rolle } from "../../types/roller";
import { Language } from "../../utils/sanity/serializers";

type Props = {
  rolleKontekst: RolleKontekster;
  rolle: Rolle;
  isLoaded: boolean;
};
const cssPrefix = "seksjon-alle-situasjoner";


export const SeksjonAlleSituasjoner = ({ rolleKontekst, rolle, isLoaded }: Props) => {
  const lenkerForKontekst = rolleKontekst.kontekster.find((kontekst) => (
    kontekst.context[Language.Bokmaal] === rolleTilSanityId[rolle]
  ));

  return (
    <PanelBase className={`${cssPrefix}${isLoaded ? ` ${cssPrefix}--loaded` : ''}`}>
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
              key={index}
            />
          ))}
        </div>
      ) : null}
    </PanelBase>
  );
};
