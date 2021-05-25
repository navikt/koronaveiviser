import Environment from "../Environment";

// Hindrer crash ved server-side kjøring (amplitude.js fungerer kun i browser)
const amplitude =
    typeof window !== 'undefined' ? require('amplitude-js') : () => null;

export enum AnalyticsCategory {
  DinSituasjon = "koronaveiviser-dinsituasjon",
  AlleSituasjoner = "koronaveiviser-allesituasjoner",
  PraktiskInfo = "koronaveiviser-praktiskinfo",
  RelatertInfo = "koronaveiviser-relatertinfo",
  ScrollDepth = "koronaveiviser-scrolldypde",
  Andre = "koronaveiviser-andre"
}

export const initAmplitude = () => {
  amplitude?.getInstance().init('default', '', {
    apiEndpoint: 'amplitude.nav.no/collect-auto',
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: window.location.toString(),
  });
};

function logAmplitudeEvent(eventName: string, data?: any): Promise<any> {
  return new Promise(function (resolve: any) {
    const eventData = data || {};
    eventData.app = 'koronaveiviser';
    eventData.origin = 'koronaveiviser';
    eventData.originVersion = 'unknown';
    amplitude?.getInstance().logEvent(eventName, eventData, resolve);
  });
}

export const triggerAnalyticsEvent = (
  category: AnalyticsCategory,
  action: string,
  label?: string
) => {
  if (Environment().miljo === "LOCAL") {
    console.log("Analytics event data: ", category, action, label);
    return;
  }

  logAmplitudeEvent('navigere', {
    category: category,
    action: action,
    label: label
  })
};
