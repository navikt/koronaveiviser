import React, { useEffect, useRef, useState } from 'react';
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

export const seksjonIds = [
  "seksjon-varsler",
  "seksjon-dinsituasjon",
  "seksjon-allesituasjoner",
  "seksjon-praktiskinfo",
  "seksjon-relatertinfo",
];

export const Page = () => {
  const [{ alerts, praktiskInfo, dinSituasjon, rolleKontekster, relatertInfo, rollevalg, frontpage }] = useStore();
  const isLoaded = alerts.isLoaded && praktiskInfo.isLoaded && dinSituasjon.isLoaded
    && rolleKontekster.isLoaded && relatertInfo.isLoaded;


  const prevScrollPos = useRef(0);

  const scrollHandler = (scrollBreakpoints: number[]) => (event: Event) => {
    const currentScrollPos = (window.pageYOffset + window.innerHeight) / window.document.body.clientHeight;
    const breakPointPassed = scrollBreakpoints
      .findIndex(breakPoint => {
        const pred = breakPoint >= prevScrollPos.current && breakPoint < currentScrollPos;
        return pred;
      });
    if (breakPointPassed) {
      console.log(seksjonIds[breakPointPassed]);
    }
    prevScrollPos.current = currentScrollPos;
  };

  const sideTittel = localeString(frontpage.pageTitle);
  useEffect(() => {
    if (isLoaded) {
      const bodyHeight = window.document.body.clientHeight;
      const seksjonBreakpoints = seksjonIds.reduce((acc, id) => {
        const element = document.getElementById(id);
        if (element) {
          return acc.concat(element.offsetTop / bodyHeight);
        }
        return acc;
      }, [] as number[]);


      window.addEventListener("scroll", scrollHandler(seksjonBreakpoints));
    }
  }, [isLoaded]);

  useEffect(() => {
    document.title = `${sideTittel} - www.nav.no`;
  }, [sideTittel]);


  return (
    <div className={"pagecontent"}>
      <MetaTags>
        <title>{sideTittel}</title>
        <meta
          name="description"
          content={localeString(frontpage.metaDescription)}
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
