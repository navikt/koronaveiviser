import React, { useEffect } from 'react';
import { useStore } from "../../store/Provider";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { GACategory, triggerGaEvent } from "../../utils/react-ga";
import { defaultLang } from "../../types/language";
import { localeString } from "../../utils/localeString";
import { getStorageItem, setStorageItem } from "../../utils/sessionStorage";

const cssPrefix = "rollevalg";

const storageKey = "nav-korona-context";

export const RolleValg = () => {
  const [{ rollevalg, rolleKontekster }, dispatch] = useStore();
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

    const rollenavnFromStorage = getStorageItem(storageKey);
    if (rollenavnFromStorage) {
      const context = konteksterSorted.find((context) =>
        localeString(context.context) === rollenavnFromStorage);
      if (context) {
        setRolle(localeString(context.context));
        return;
      }
    }

    setRolle(localeString(konteksterSorted[0].context))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolleKontekster]);

  return (
    <div className={cssPrefix}>
      <span className={`${cssPrefix}__filler-start`} />
      {konteksterSorted.map((context, index) => {
        const rollenavn = (context.context && context.context[defaultLang]) || "";
        return (
          rollenavn === rollevalg ? (
            <Normaltekst className={`${cssPrefix}__selected`} key={index}>
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
              key={index}
              className={`${cssPrefix}__lenke`}
            >
              <>{rollenavn}</>
            </Lenke>
          ))
      })}
      <span className={`${cssPrefix}__filler-end`} />
    </div>
  );
};
