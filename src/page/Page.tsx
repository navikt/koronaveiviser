import React from 'react';
import { SeksjonVarsler } from "./seksjon-varsler/SeksjonVarsler";
import { SeksjonDinSituasjon } from "./seksjon-din-situasjon/SeksjonDinSituasjon";
import { SeksjonAlleSituasjoner } from "./seksjon-alle-situasjoner/SeksjonAlleSituasjoner";
import { SeksjonPraktiskInfo } from "./seksjon-praktisk-info/SeksjonPraktiskInfo";
import { useStore } from "../store/Provider";
import { ToppLinje } from "./topp-linje/ToppLinje";

export const Page = () => {
  const [{ alerts, praktiskInfo, dinSituasjon, rolleKontekster, rollevalg }] = useStore();

  return (
    <div className={"pagecontent"}>
      <ToppLinje />
      <SeksjonVarsler varsler={alerts} />
      <SeksjonDinSituasjon dinSituasjon={dinSituasjon} />
      <SeksjonAlleSituasjoner rolleKontekst={rolleKontekster} rolle={rollevalg} />
      <SeksjonPraktiskInfo praktiskInfo={praktiskInfo} />
    </div>
  );
};
