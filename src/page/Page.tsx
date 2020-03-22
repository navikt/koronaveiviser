import React from 'react';
import { SeksjonVarsler } from "./seksjon-varsler/SeksjonVarsler";
import { SeksjonDinSituasjon } from "./seksjon-din-situasjon/SeksjonDinSituasjon";
import { SeksjonAlleSituasjoner } from "./seksjon-alle-situasjoner/SeksjonAlleSituasjoner";
import { SeksjonPraktiskInfo } from "./seksjon-praktisk-info/SeksjonPraktiskInfo";
import { useStore } from "../store/Provider";
import { ToppLinje } from "./topp-linje/ToppLinje";
import NavFrontendSpinner from "nav-frontend-spinner";
import NavChatbot from "@navikt/nav-chatbot";
import { SeksjonRelatertInfo } from "./seksjon-relatert-info/SeksjonRelatertInfo";

export const Page = () => {
  const [{ alerts, praktiskInfo, dinSituasjon, rolleKontekster, relatertInfo, rollevalg }] = useStore();
  const isLoaded = alerts.isLoaded && praktiskInfo.isLoaded && dinSituasjon.isLoaded
    && rolleKontekster.isLoaded && relatertInfo.isLoaded;

  return (
    <div className={"pagecontent"}>
      <ToppLinje />
      {!isLoaded && <div className={"big-spinner"}><NavFrontendSpinner /></div>}
      <SeksjonVarsler varsler={alerts} isLoaded={isLoaded} />
      <SeksjonDinSituasjon dinSituasjon={dinSituasjon} isLoaded={isLoaded} />
      <SeksjonAlleSituasjoner rolleKontekst={rolleKontekster} rolle={rollevalg} isLoaded={isLoaded} />
      <SeksjonPraktiskInfo praktiskInfo={praktiskInfo} isLoaded={isLoaded} />
      <SeksjonRelatertInfo relatertInfo={relatertInfo} isLoaded={isLoaded} />
      <NavChatbot
        customerKey="41155"
        queueKey="Q_CHAT_BOT"
        configId="599f9e7c-7f6b-4569-81a1-27202c419953"
      />
    </div>
  );
};
