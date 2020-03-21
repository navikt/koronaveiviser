import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Innholdstittel} from "nav-frontend-typografi";
import AlertStripe from "nav-frontend-alertstriper";

const cssPrefix = "topp-seksjon";

export const ToppSeksjon = () => {

  return (
    <PanelBase className={cssPrefix}>
      <div className={`${cssPrefix}__header`}>
        <Innholdstittel>
          Koronavirus - informasjon og hjelp fra NAV
        </Innholdstittel>
      </div>
      <div className={`${cssPrefix}__innhold`}>
        <AlertStripe type={"info"}>
          Forslagene om lov...osv
        </AlertStripe>
      </div>
    </PanelBase>
  );
};
