import React, { useEffect } from 'react';
import { useStore } from "../../store/Provider";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { Language } from "../../utils/sanity/serializers";
import { GACategory, triggerGaEvent } from "../../utils/react-ga";

const cssPrefix = "rollevalg";

export const RolleValg = () => {
  const [{ rollevalg, rolleKontekster }, dispatch] = useStore();
  const setRolle = (event: any, rolle: string) => {
    event.preventDefault();
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
    dispatch({
      type: "SETT_ROLLE",
      payload: konteksterSorted[0].context[Language.Bokmaal],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolleKontekster]);

  return (
    <div className={cssPrefix}>
      <span className={`${cssPrefix}__filler-start`} />
      {konteksterSorted.map((context, index) => {
        const rollenavn = (context.context && context.context[Language.Bokmaal]) || "";
        return (
          rollenavn === rollevalg ? (
            <Normaltekst className={`${cssPrefix}__selected`} key={index}>
              {rollenavn}
            </Normaltekst>
          ) : (
            <Lenke
              href={""}
              onClick={(event) => {
                setRolle(event, rollenavn);
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

