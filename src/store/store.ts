import { Alert, Alerts, initialAlerts } from "../utils/sanity/endpoints/alert";
import { Rolle } from "../types/roller";

export const initialState = {
  visTekniskFeilMelding: false,
  alerts: initialAlerts as Alerts,
  rollevalg: Rolle.Privatperson,
};

export interface Store {
  visTekniskFeilMelding: boolean;
  alerts: Alerts;
  rollevalg: Rolle;
}

export type Action = {
  type: "SETT_ALERTS";
  payload: Array<Alert>;
} | {
  type: "SETT_ALERTS_FETCH_FAILED";
} | {
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
