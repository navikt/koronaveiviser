import { Alert, Alerts, initialAlerts } from "../utils/sanity/endpoints/alert";

export const initialState = {
  visTekniskFeilMelding: false,
  alerts: initialAlerts as Alerts,
};

export interface Store {
  visTekniskFeilMelding: boolean;
  alerts: Alerts;
}

export type Action = {
  type: "SETT_ALERTS";
  payload: Array<Alert>;
} | {
  type: "SETT_ALERTS_FETCH_FAILED";
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
    default:
      return state;
  }
};
