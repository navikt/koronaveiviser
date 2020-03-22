import React from 'react';
import { useStore } from "../../store/Provider";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { Language } from "../../utils/sanity/serializers";

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

  return (
    <div className={cssPrefix}>
      <span className={`${cssPrefix}__filler-start`} />
      {rolleKontekster.kontekster.map((context, index) => {
        const rollenavn = (context.context && context.context[Language.Bokmaal]) || "";
        return (
          rollenavn === rollevalg ? (
            <Normaltekst className={`${cssPrefix}__selected`} key={index}>
              {rollenavn}
            </Normaltekst>
          ) : (
            <Lenke
              href={""}
              onClick={(event) => setRolle(event, rollenavn)}
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

