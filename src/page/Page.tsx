import React, { useEffect } from 'react';
import { SeksjonVarsler } from "./seksjon-varsler/SeksjonVarsler";
import { SeksjonDinSituasjon } from "./seksjon-din-situasjon/SeksjonDinSituasjon";
import { SeksjonAlleSituasjoner } from "./seksjon-alle-situasjoner/SeksjonAlleSituasjoner";
import { SeksjonPraktiskInfo } from "./seksjon-praktisk-info/SeksjonPraktiskInfo";
import { useStore } from "../store/Provider";
import { ToppLinje } from "./topp-linje/ToppLinje";
import NavFrontendSpinner from "nav-frontend-spinner";
import NavChatbot from "@navikt/nav-chatbot";
import { SeksjonRelatertInfo } from "./seksjon-relatert-info/SeksjonRelatertInfo";
import { localeString } from "../utils/localeString";
import MetaTags from "react-meta-tags";
import { defaultLang } from "../types/language";

export const Page = () => {
  const [{ alerts, praktiskInfo, dinSituasjon, rolleKontekster, relatertInfo, rollevalg, frontpage }] = useStore();
  const isLoaded = alerts.isLoaded && praktiskInfo.isLoaded && dinSituasjon.isLoaded
    && rolleKontekster.isLoaded && relatertInfo.isLoaded;

  // @ts-ignore
  // uggggh
  const metaDesc = frontpage.metaDescription && frontpage.metaDescription[defaultLang] && frontpage.metaDescription[defaultLang][0].children
    .reduce((acc: string, span: any) => (acc + span.text), "");

  const sideTittel = localeString(frontpage.pageTitle);
  useEffect(() => {
    document.title = `${sideTittel} - www.nav.no`;
  }, [sideTittel]);

  return (
    <div className={"pagecontent"}>
      <MetaTags>
        <title>{sideTittel}</title>
        <meta
          name="description"
          content={metaDesc}
        />
      </MetaTags>
      <ToppLinje tittel={sideTittel} />
      {!isLoaded && <div className={"big-spinner"}><NavFrontendSpinner /></div>}
      <SeksjonVarsler varsler={alerts} tittel={sideTittel} isLoaded={isLoaded} />
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
