import React, { useEffect, Fragment } from 'react';
import { useStore } from "../../../store/Provider";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { GACategory, triggerGaEvent } from "../../../utils/react-ga";
import { defaultLang } from "../../../types/language";
import { localeString } from "../../../utils/localeString";
import { getStorageItem, setStorageItem } from "../../../utils/sessionStorage";
import { Element } from "react-scroll";

const cssPrefix = "rollevalg";

const storageKey = "nav-korona-context";

export const RolleValg = () => {
  const [{ rollevalg, rolleKontekster, anchor }, dispatch] = useStore();
  const setRolle = (rolle: string) => {
    setStorageItem(storageKey, rolle);
    dispatch({
      type: "SETT_ROLLE",
      payload: rolle,
    })
  };

  const konteksterSorted = rolleKontekster.kontekster
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (!konteksterSorted[0]) {
      return;
    }

    const anchorSegment = anchor.hash.split("_")[0];
    const contextFromAnchor = anchorSegment && konteksterSorted
      .find(context => context.anchor && context.anchor.current === anchorSegment);
    if (contextFromAnchor) {
      setRolle(localeString(contextFromAnchor.context));
      return;
    }

    const contextFromStorage = getStorageItem(storageKey);
    if (contextFromStorage) {
      const context = konteksterSorted.find((context) =>
        localeString(context.context) === contextFromStorage);
      if (context) {
        setRolle(localeString(context.context));
        return;
      }
    }

    setRolle(localeString(konteksterSorted[0].context))
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
                  setRolle(rollenavn);
                  triggerGaEvent(
                    GACategory.AlleSituasjoner,
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
