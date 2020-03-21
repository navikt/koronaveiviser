import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import { LenkeData, LenkeSeksjonData } from "../../types/lenker";
import { LenkeSeksjon } from "../../components/lenke-seksjon/LenkeSeksjon";

const cssPrefix = "bunn-seksjon";

const testLenker1: LenkeData[] = [
  {
    href: "#",
    tekst: "qwer"
  },
  {
    href: "#",
    tekst: "asdf"
  },
  {
    href: "#",
    tekst: "zxcv"
  },
  {
    href: "#",
    tekst: "tyui"
  },
];

const testLenkeSeksjoner: LenkeSeksjonData[] = [
  {
    tittel: "Arbeidssøker",
    lenker: testLenker1,
  },
  {
    tittel: "Syk",
    lenker: testLenker1,
  },
  {
    tittel: "Familie",
    lenker: testLenker1,
  },
  {
    tittel: "Internasjonalt",
    lenker: testLenker1,
  },
  {
    tittel: "Hjelpemidler",
    lenker: testLenker1,
  },
  {
    tittel: "Sosial",
    lenker: testLenker1,
  },
  {
    tittel: "Pensjonister",
    lenker: testLenker1,
  },
];

export const BunnSeksjon = () => {

  return (
    <PanelBase className={cssPrefix}>
      <div className={`${cssPrefix}__header`}>
        <Systemtittel>
          Andre situasjoner
        </Systemtittel>
      </div>
      <HeaderSeparator />
      <div className={`${cssPrefix}__rollevalg`}>
      </div>
      <div className={`${cssPrefix}__lenkeseksjoner`}>
        {testLenkeSeksjoner.map((lenkeSeksjon, index) => (
          <LenkeSeksjon tittel={lenkeSeksjon.tittel} lenker={lenkeSeksjon.lenker} key={index}/>
        ))}
      </div>
    </PanelBase>
  );
};
