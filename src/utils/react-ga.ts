import ReactGA from "react-ga";
import Environment from "../Environment";

const trackingId = "UA-9127381-16";

export enum GACategory {
  DinSituasjon = "koronaveiviser-dinsituasjon",
  AlleSituasjoner = "koronaveiviser-allesituasjoner",
  PraktiskInfo = "koronaveiviser-praktiskinfo",
  RelatertInfo = "koronaveiviser-relatertinfo",
  ScrollDepth = "koronaveiviser-scrolldypde",
  Andre = "koronaveiviser-andre"
}

export const initGA = () => {
  ReactGA.initialize(trackingId, {
    titleCase: false,
    debug: false
  });
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export const triggerGaEvent = (
  category: GACategory,
  action: string,
  label?: string
) => {
  if (Environment().miljo !== "PROD") {
    console.log("GA event data: ", category, action, label);
    return;
  }

  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};
