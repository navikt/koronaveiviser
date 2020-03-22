import React from 'react';
import ikon from "../../assets/home-1-line.svg";
import Environment from "../../Environment";
import Lenke from "nav-frontend-lenker";
import { Element } from "nav-frontend-typografi";
import { HoyreChevron } from "nav-frontend-chevron";
import { GACategory, triggerGaEvent } from "../../utils/react-ga";

const cssPrefix = "topp-linje";

export const ToppLinje = () => {
  return (
    <div className={cssPrefix}>
      <img src={ikon} alt={""} className={`${cssPrefix}__ikon`} />
      <Lenke
        href={Environment().baseUrl}
        onClick={() => {
        triggerGaEvent(
          GACategory.Andre,
          "lenke/topplinje",
          Environment().baseUrl
        )
      }}>
        {"nav.no"}
      </Lenke>
      <HoyreChevron className={`${cssPrefix}__chevron`} />
      <Element className={`${cssPrefix}__tekst`}>
        {"Koronavirus - hva gjelder i min situasjon?"}
      </Element>
    </div>
  );
};
