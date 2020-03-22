import ReactGA from 'react-ga';

const trackingId = 'UA-9127381-16';

export enum GACategory {
  DinSituasjon = 'koronaveiviser-dinsituasjon',
  AlleSituasjoner = 'koronaveiviser-allesituasjoner',
  PraktiskInfo = 'koronaveiviser-praktiskinfo',
  Andre = "koronaveiviser-andre"
}

export const initGA = () => {
  ReactGA.initialize(trackingId, {
    titleCase: false,
    debug: true,
  });
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export const triggerGaEvent = (category: GACategory, action: string, label?: string) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
