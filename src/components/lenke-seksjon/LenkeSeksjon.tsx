import React from 'react';
import { LenkeData } from "../../types/lenker";
import { Undertittel } from "nav-frontend-typografi";
import LenkeMedChevron from "../lenke-med-chevron/LenkeMedChevron";

type Props = {
  tittel: string;
  lenker: LenkeData[];
}

const cssPrefix = "lenke-seksjon";

export const LenkeSeksjon = ({tittel, lenker}: Props) => {

  return (
    <div className={cssPrefix}>
      <div className={`${cssPrefix}__tittel`}>
        <Undertittel>
          {tittel}
        </Undertittel>
      </div>
      <div className={`${cssPrefix}__lenker`}>
        {lenker.map((lenke, index) => (
          <LenkeMedChevron href={lenke.href}>
            <>{lenke.tekst}</>
          </LenkeMedChevron>
        ))}
      </div>
    </div>
  );
};
