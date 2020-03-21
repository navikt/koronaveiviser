import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import Lenkepanel from "nav-frontend-lenkepanel/lib";
import { LenkeData } from "../../types/lenker";

const cssPrefix = "midt-seksjon";

const testLenker: LenkeData[] = [
  {
    tekst: "Jeg er permittert",
    href: ""
  },
  {
    tekst: "Jeg har mistet jobben",
    href: ""
  },
  {
    tekst: "Jeg må være hjemme med barn",
    href: ""
  },
  {
    tekst: "Jeg er i isolasjon eller i karantene",
    href: ""
  },
  {
    tekst: "Jeg er selvstendig næringsdrivende eller frilanser",
    href: ""
  },
  {
    tekst: "Jeg er arbeidsgiver",
    href: ""
  },
];

export const MidtSeksjon = () => {

  return (
    <PanelBase className={cssPrefix}>
      <div className={`${cssPrefix}__header`}>
        <Systemtittel>
          Hva er din situasjon?
        </Systemtittel>
      </div>
      <HeaderSeparator />
      <div className={`${cssPrefix}__innhold`}>
        {testLenker.map((lenke, index) => (
          <Lenkepanel href={lenke.href} tittelProps={"undertittel"} border={true} key={index}>
            {lenke.tekst}
          </Lenkepanel>
        ))}
      </div>
    </PanelBase>
  );
};
