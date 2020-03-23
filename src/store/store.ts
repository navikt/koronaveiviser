import { Alert, Alerts, initialAlerts } from "../utils/sanity/endpoints/alert";
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
import {
  initialRelatertInfo,
  RelatedInfo,
  RelatertInfo
} from "../utils/sanity/endpoints/related";
import {
  Frontpage,
  initialFrontpage
} from "../utils/sanity/endpoints/frontpage";

export const initialState = {
  visTekniskFeilMelding: false,
  rollevalg: "",
  alerts: initialAlerts as Alerts,
  praktiskInfo: initialInformation as PraktiskInfo,
  dinSituasjon: initialDinSituasjon as DinSituasjon,
  rolleKontekster: initialRolleKontekster as RolleKontekster,
  relatertInfo: initialRelatertInfo as RelatertInfo,
  frontpage: initialFrontpage as Frontpage
};

export interface Store {
  visTekniskFeilMelding: boolean;
  alerts: Alerts;
  rollevalg: string;
  praktiskInfo: PraktiskInfo;
  dinSituasjon: DinSituasjon;
  rolleKontekster: RolleKontekster;
  relatertInfo: RelatertInfo;
  frontpage: Frontpage;
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
      type: "SETT_RELATED_INFO";
      payload: RelatedInfo[];
    }
  | {
      type: "SETT_RELATED_INFO_FETCH_FAILED";
    }
  | {
      type: "SETT_FRONTPAGE";
      payload: Frontpage;
    }
  | {
      type: "SETT_ROLLE";
      payload: string;
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
    case "SETT_RELATED_INFO":
      return {
        ...state,
        relatertInfo: { info: action.payload, isLoaded: true }
      };
    case "SETT_RELATED_INFO_FETCH_FAILED": {
      return {
        ...state,
        relatertInfo: { ...state.relatertInfo, isLoaded: true },
        visTekniskFeilMelding: true
      };
    }
    case "SETT_FRONTPAGE":
      return {
        ...state,
        frontpage: action.payload
      };
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
