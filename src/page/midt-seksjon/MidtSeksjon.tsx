import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";

const cssPrefix = "midt-seksjon";

export const MidtSeksjon = () => {

  return (
    <PanelBase className={cssPrefix}>
      <div className={`${cssPrefix}__header`}>
        <Systemtittel>
          Hva er din situasjon?
        </Systemtittel>
      </div>
      <HeaderSeparator/>
      <div className={`${cssPrefix}__innhold`}>

      </div>
    </PanelBase>
  );
};
