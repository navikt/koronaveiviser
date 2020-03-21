import React from 'react';
import { useStore } from "../../store/Provider";
import { Rolle, rolleData } from "../../types/roller";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";

const cssPrefix = "rollevalg";

export const RolleValg = () => {
  const [{ rollevalg }, dispatch] = useStore();
  const setRolle = (event: any, rolle: Rolle) => {
    event.preventDefault();
    dispatch({
      type: "SETT_ROLLE",
      payload: rolle,
    })
  };

  return (
    <div className={cssPrefix}>
      {rolleData.map((rolle, index) => (
        rolle.rolle === rollevalg ? (
          <Normaltekst className={`${cssPrefix}__selected`} key={index}>
            {rolle.navn}
          </Normaltekst>
        ) : (
          <Lenke
            href={""}
            onClick={(event) => setRolle(event, rolle.rolle)}
            key={index}
            className={`${cssPrefix}__lenke`}
          >
            <>{rolle.navn}</>
          </Lenke>
        )
      ))}
      <span className={`${cssPrefix}__filler`}/>
    </div>
  );
};

