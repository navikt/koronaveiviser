import React, { useEffect, Fragment } from 'react';
import { useStore } from "../../../store/Provider";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { AnalyticsCategory, triggerAnalyticsEvent } from "../../../utils/amplitude";
import { defaultLang } from "../../../types/language";
import { localeString } from "../../../utils/sanity/localeString";
import { getStorageItem, setStorageItem } from "../../../utils/sessionStorage";
import { Element } from "react-scroll";
import { RoleContext } from "../../../utils/sanity/endpoints/contexts";

const cssPrefix = "rollevalg";

const storageKey = "nav-korona-context";

const findContextFromAnchor = (contexts: RoleContext[], anchor: string) => (
  anchor && contexts.find(context => context.anchor?.current === anchor ||
    context.inforefs?.some(inforef => inforef.anchor?.current === anchor))
);

export const RolleValg = () => {
  const [{ rollevalg, rolleKontekster, anchor }, dispatch] = useStore();
  const setRolle = (context: RoleContext, setHash?: boolean) => {
    if (setHash) {
      window.history.replaceState(null, '', `${document.location.pathname}#${context.anchor?.current || ''}`)
    }

    const rolleString = localeString(context.context);

    setStorageItem(storageKey, rolleString);
    dispatch({
      type: "SETT_ROLLE",
      payload: rolleString,
    })
  };

  const konteksterSorted = rolleKontekster.kontekster
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (konteksterSorted.length === 0) {
      return;
    }

    const contextFromAnchor = findContextFromAnchor(konteksterSorted, anchor.hash);
    if (contextFromAnchor) {
      setRolle(contextFromAnchor);
      return;
    }

    const contextFromStorage = getStorageItem(storageKey);
    if (contextFromStorage) {
      const context = konteksterSorted.find((context) =>
        localeString(context.context) === contextFromStorage);
      if (context) {
        setRolle(context, true);
        return;
      }
    }

    setRolle(konteksterSorted[0], true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolleKontekster, anchor]);

  return (
    <div className={cssPrefix}>
      <span className={`${cssPrefix}__filler-start`} />
      {konteksterSorted.map((context, index) => {
        const rollenavn = (context.context && context.context[defaultLang]) || "";
        return (
          <Fragment key={index}>
            <Element name={context.anchor?.current || "rollevalg"} className={`${cssPrefix}__rolle-anchor`} />
            {rollenavn === rollevalg ? (
              <Normaltekst className={`${cssPrefix}__tab ${cssPrefix}__selected`}>
                {rollenavn}
              </Normaltekst>
            ) : (
              <Lenke
                href={""}
                onClick={(event) => {
                  event.preventDefault();
                  setRolle(context, true);
                  triggerAnalyticsEvent(
                    AnalyticsCategory.AlleSituasjoner,
                    `rollevalg/${rollenavn}`
                  )
                }}
                className={`${cssPrefix}__tab`}
              >
                <>{rollenavn}</>
              </Lenke>
            )}
          </Fragment>
        )
      })}
      <span className={`${cssPrefix}__filler-end`} />
    </div>
  );
};
