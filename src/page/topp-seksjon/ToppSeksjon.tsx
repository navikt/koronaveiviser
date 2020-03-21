import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Innholdstittel } from "nav-frontend-typografi";
import { useStore } from "../../redux/Provider";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";

const cssPrefix = "topp-seksjon";

export const ToppSeksjon = () => {
  const [{ alerts }] = useStore();

  return (
    <PanelBase className={cssPrefix}>
      <div className={`${cssPrefix}__header`}>
        <Innholdstittel>
          Koronavirus - informasjon og hjelp fra NAV
        </Innholdstittel>
      </div>
      <div className={`${cssPrefix}__innhold`}>
        <SanityBlocks blocks={alerts.alerts} />
      </div>
    </PanelBase>
  );
};
