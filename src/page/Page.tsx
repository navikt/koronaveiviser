import React, { useEffect, useRef } from 'react';
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
import { GACategory, triggerGaEvent } from "../utils/react-ga";
import { getStorageItem, setStorageItem } from "../utils/sessionStorage";
import { scroller } from "react-scroll";

export const seksjonIds = [
  "seksjon-varsler",
  "seksjon-dinsituasjon",
  "seksjon-allesituasjoner",
  "seksjon-praktiskinfo",
  "seksjon-relatertinfo",
];

const scrollBreakpoints = [0.25, 0.5, 0.75, 0.999];

const getScrollPosition = () =>
  (window.pageYOffset + window.innerHeight) / Math.max(
  window.document.body.clientHeight, window.document.body.scrollHeight,
  window.document.documentElement.clientHeight, window.document.documentElement.scrollHeight
  );

const getPercentage = (n: number) => `${Math.floor(n * 100 + 0.5).toString()}%`;

const storageKey = "nav-korona-scroll-depth";

const getHash = () => {
  const parts = window.location.href.split("#");
  return parts.length > 1 ? parts[1] : ``;
};

const scrollToAnchor = (id: string) => {
  scroller.scrollTo(id, {
    smooth: true
  });
};

const removeHash = () =>
  window.history.pushState(null, "", " ");

export const Page = () => {
  const [{ anchor, alerts, praktiskInfo, dinSituasjon, rolleKontekster, relatertInfo, rollevalg, frontpage }, dispatch] = useStore();
  const isLoaded = alerts.isLoaded && praktiskInfo.isLoaded && dinSituasjon.isLoaded
    && rolleKontekster.isLoaded && relatertInfo.isLoaded;

  const prevScrollPos = useRef(0);

  useEffect(() => {
    if (isLoaded) {
      scrollToAnchor(anchor.hash);
      removeHash();
    }
  }, [isLoaded, anchor]);

  window.onhashchange = () => {
    dispatch({ type: "SETT_ANCHOR", payload: getHash() });
  };

  const scrollHandler = () => {
    const currentScrollPos = getScrollPosition();
    const breakPointPassedDown = scrollBreakpoints
      .find(breakPoint =>
        breakPoint >= prevScrollPos.current && breakPoint < currentScrollPos);
    if (breakPointPassedDown) {
      triggerGaEvent(
        GACategory.ScrollDepth,
        getPercentage(breakPointPassedDown)
      );
      setStorageItem(storageKey, currentScrollPos.toString());
      prevScrollPos.current = currentScrollPos;
    }
  };

  const sideTittel = localeString(frontpage.pageTitle);
  useEffect(() => {
    if (isLoaded) {
      const sessionScrollDepth = getStorageItem(storageKey);
      if (sessionScrollDepth && sessionScrollDepth !== "") {
        const num = parseFloat(sessionScrollDepth);
        if (!isNaN(num)) {
          prevScrollPos.current = parseFloat(sessionScrollDepth);
        }
      }

      const handler = scrollHandler;
      window.addEventListener("scroll", handler);
      return () => window.removeEventListener("scroll", handler);
    }
  }, [isLoaded]);

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
