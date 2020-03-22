import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Innholdstittel } from "nav-frontend-typografi";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import { Alerts } from "../../utils/sanity/endpoints/alert";

type Props = {
  varsler: Alerts;
  isLoaded: boolean;
};

const cssPrefix = "seksjon-varsler";

export const SeksjonVarsler = ({ varsler, isLoaded }: Props) => {
  return (
    <PanelBase className={`${cssPrefix} seksjon-panel${isLoaded ? ` seksjon-panel--loaded` : ''}`}>
      <div className={`${cssPrefix}__header`}>
        <Innholdstittel>
          {"Koronavirus - hva gjelder i min situasjon?"}
        </Innholdstittel>
      </div>
      <div className={`${cssPrefix}__innhold`}>
        <SanityBlocks blocks={varsler.alerts} />
      </div>
    </PanelBase>
  );
};
