import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Innholdstittel } from "nav-frontend-typografi";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import { Alerts } from "../../utils/sanity/endpoints/alert";

const cssPrefix = "varsler-seksjon";

type Props = {
  varsler: Alerts;
};

export const VarslerSeksjon = ({ varsler }: Props) => {
  return (
    <PanelBase className={cssPrefix}>
      <div className={`${cssPrefix}__header`}>
        <Innholdstittel>
          {"Koronavirus - informasjon og hjelp fra NAV"}
        </Innholdstittel>
      </div>
      <div className={`${cssPrefix}__innhold`}>
        <SanityBlocks blocks={varsler.alerts} />
      </div>
    </PanelBase>
  );
};
