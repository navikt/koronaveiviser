import React, { useEffect, useRef } from "react";
import { SeksjonVarsler } from "./seksjon-varsler/SeksjonVarsler";
import { SeksjonDinSituasjon } from "./seksjon-din-situasjon/SeksjonDinSituasjon";
import { SeksjonAlleSituasjoner } from "./seksjon-alle-situasjoner/SeksjonAlleSituasjoner";
import { useStore } from "../store/Provider";
import NavFrontendSpinner from "nav-frontend-spinner";
import { SeksjonRelatertInfo } from "./seksjon-relatert-info/SeksjonRelatertInfo";
import { localeString } from "../utils/sanity/localeString";
import MetaTags from "react-meta-tags";
import { AnalyticsCategory, triggerAnalyticsEvent } from "../utils/amplitude";
import { getStorageItem, setStorageItem } from "../utils/sessionStorage";
import { scroller } from "react-scroll";

const scrollBreakpoints = [0.25, 0.5, 0.75, 0.999];

const getScrollPosition = () =>
  (window.pageYOffset + window.innerHeight) /
  Math.max(
    window.document.body.clientHeight,
    window.document.body.scrollHeight,
    window.document.documentElement.clientHeight,
    window.document.documentElement.scrollHeight
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

export const Page = () => {
  const [
    { anchor, alerts, dinSituasjon, rolleKontekster, relatertInfo, frontpage },
    dispatch
  ] = useStore();
  const isLoaded =
    alerts.isLoaded &&
    dinSituasjon.isLoaded &&
    rolleKontekster.isLoaded &&
    relatertInfo.isLoaded;
  const sideTittel = localeString(frontpage.pageTitle);
  const prevScrollPos = useRef(0);
  const dispatchAnchor = () =>
    dispatch({ type: "SETT_ANCHOR", payload: getHash() });
  window.onhashchange = dispatchAnchor;

  const scrollDepthHandler = () => {
    const currentScrollPos = getScrollPosition();
    const breakPointPassedDown = scrollBreakpoints.find(
      breakPoint =>
        breakPoint >= prevScrollPos.current && breakPoint < currentScrollPos
    );
    if (breakPointPassedDown) {
      triggerAnalyticsEvent(
        AnalyticsCategory.ScrollDepth,
        getPercentage(breakPointPassedDown)
      );
      setStorageItem(storageKey, currentScrollPos.toString());
      prevScrollPos.current = currentScrollPos;
    }
  };

  useEffect(() => {
    if (isLoaded) {
      dispatchAnchor();

      const sessionScrollDepth = getStorageItem(storageKey);
      if (sessionScrollDepth && sessionScrollDepth !== "") {
        const num = parseFloat(sessionScrollDepth);
        if (!isNaN(num)) {
          prevScrollPos.current = parseFloat(sessionScrollDepth);
        }
      }
      const handler = scrollDepthHandler;
      window.addEventListener("scroll", handler);
      return () => window.removeEventListener("scroll", handler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      window.requestAnimationFrame(() => {
        scrollToAnchor(anchor.hash);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor]);

  return (
    <div role={"main"} className={"pagecontent"}>
      <MetaTags>
        <title>{sideTittel}</title>
        <meta
          name="description"
          content={localeString(frontpage.metaDescription)}
        />
      </MetaTags>
      {!isLoaded && (
        <div className={"big-spinner"}>
          <NavFrontendSpinner type={"XL"} />
        </div>
      )}
      <SeksjonVarsler
        varsler={alerts}
        tittel={sideTittel}
        isLoaded={isLoaded}
      />
      <SeksjonDinSituasjon dinSituasjon={dinSituasjon} isLoaded={isLoaded} />
      <SeksjonAlleSituasjoner
        kontekster={rolleKontekster}
        isLoaded={isLoaded}
      />
      <SeksjonRelatertInfo relatertInfo={relatertInfo} isLoaded={isLoaded} />
    </div>
  );
};
