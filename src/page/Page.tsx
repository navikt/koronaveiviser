import React from 'react';
import { SeksjonVarsler } from "./seksjon-varsler/SeksjonVarsler";
import { SeksjonDinSituasjon } from "./seksjon-din-situasjon/SeksjonDinSituasjon";
import { SeksjonAlleSituasjoner } from "./seksjon-alle-situasjoner/SeksjonAlleSituasjoner";
import { SeksjonPraktiskInfo } from "./seksjon-praktisk-info/SeksjonPraktiskInfo";
import { useStore } from "../store/Provider";
import { ToppLinje } from "./topp-linje/ToppLinje";

export const Page = () => {
  const [{ alerts, praktiskInfo, dinSituasjon, rolleKontekster, rollevalg }] = useStore();
  const isLoaded = alerts.isLoaded && praktiskInfo.isLoaded && dinSituasjon.isLoaded && rolleKontekster.isLoaded;

  return (
    <div className={"pagecontent"}>
      <ToppLinje />
      <SeksjonVarsler varsler={alerts} isLoaded={isLoaded} />
      <SeksjonDinSituasjon dinSituasjon={dinSituasjon} isLoaded={isLoaded} />
      <SeksjonAlleSituasjoner rolleKontekst={rolleKontekster} rolle={rollevalg} isLoaded={isLoaded} />
      <SeksjonPraktiskInfo praktiskInfo={praktiskInfo} isLoaded={isLoaded} />
    </div>
  );
};
