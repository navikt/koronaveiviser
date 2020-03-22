import { Alert, Alerts, initialAlerts } from "../utils/sanity/endpoints/alert";
import { Rolle } from "../types/roller";
import {
  Information,
  initialInformation,
  PraktiskInfo
} from "../utils/sanity/endpoints/information";
import {
  DinSituasjon,
  initialDinSituasjon,
  YourSituation
} from "../utils/sanity/endpoints/your-situation";
import {
  initialRolleKontekster,
  RoleContext,
  RolleKontekster
} from "../utils/sanity/endpoints/contexts";

export const initialState = {
  visTekniskFeilMelding: false,
  rollevalg: Rolle.Privatperson,
  alerts: initialAlerts as Alerts,
  praktiskInfo: initialInformation as PraktiskInfo,
  dinSituasjon: initialDinSituasjon as DinSituasjon,
  rolleKontekster: initialRolleKontekster as RolleKontekster
};

export interface Store {
  visTekniskFeilMelding: boolean;
  alerts: Alerts;
  rollevalg: Rolle;
  praktiskInfo: PraktiskInfo;
  dinSituasjon: DinSituasjon;
  rolleKontekster: RolleKontekster;
}

export type Action =
  | {
      type: "SETT_ALERTS";
      payload: Alert[];
    }
  | {
      type: "SETT_ALERTS_FETCH_FAILED";
    }
  | {
      type: "SETT_INFORMATION";
      payload: Information[];
    }
  | {
      type: "SETT_INFORMATION_FETCH_FAILED";
    }
  | {
      type: "SETT_YOUR_SITUATION";
      payload: YourSituation[];
    }
  | {
      type: "SETT_YOUR_SITUATION_FETCH_FAILED";
    }
  | {
      type: "SETT_CONTEXTS";
      payload: RoleContext[];
    }
  | {
      type: "SETT_CONTEXTS_FETCH_FAILED";
    }
  | {
      type: "SETT_ROLLE";
      payload: Rolle;
    };

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case "SETT_ALERTS":
      return {
        ...state,
        alerts: {
          isLoaded: true,
          alerts: action.payload
        }
      };
    case "SETT_ALERTS_FETCH_FAILED": {
      return {
        ...state,
        alerts: { ...state.alerts, isLoaded: true },
        visTekniskFeilMelding: true
      };
    }
    case "SETT_INFORMATION":
      return {
        ...state,
        praktiskInfo: { info: action.payload, isLoaded: true }
      };
    case "SETT_INFORMATION_FETCH_FAILED": {
      return {
        ...state,
        praktiskInfo: { ...state.praktiskInfo, isLoaded: true },
        visTekniskFeilMelding: true
      };
    }
    case "SETT_YOUR_SITUATION":
      return {
        ...state,
        dinSituasjon: { situasjoner: action.payload, isLoaded: true }
      };
    case "SETT_YOUR_SITUATION_FETCH_FAILED": {
      return {
        ...state,
        dinSituasjon: { ...state.dinSituasjon, isLoaded: true },
        visTekniskFeilMelding: true
      };
    }
    case "SETT_CONTEXTS":
      return {
        ...state,
        rolleKontekster: { kontekster: action.payload, isLoaded: true }
      };
    case "SETT_CONTEXTS_FETCH_FAILED": {
      return {
        ...state,
        rolleKontekster: { ...state.rolleKontekster, isLoaded: true },
        visTekniskFeilMelding: true
      };
    }
    case "SETT_ROLLE": {
      return {
        ...state,
        rollevalg: action.payload
      };
    }
    default:
      return state;
  }
};
