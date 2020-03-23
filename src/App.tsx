import React, { useEffect } from "react";
import { Page } from "./page/Page";
import {
  fetchAlerts,
  fetchContexts,
  fetchFrontpage,
  fetchInformation,
  fetchRelated,
  fetchTimeoutMs,
  fetchYourSituation,
  timeoutPromise
} from "./clients/api";
import { Alert } from "./utils/sanity/endpoints/alert";
import { useStore } from "./store/Provider";
import { Information } from "./utils/sanity/endpoints/information";
import { YourSituation } from "./utils/sanity/endpoints/your-situation";
import { RoleContext } from "./utils/sanity/endpoints/contexts";
import { RelatedInfo } from "./utils/sanity/endpoints/related";
import { Frontpage } from "./utils/sanity/endpoints/frontpage";
import { hookChatbotOpenWithGaEvent } from "./utils/chatbotUtils";

function App() {
  const [, dispatch] = useStore();

  // TODO: refaktorer dette
  useEffect(() => {
    Promise.race<any>([
      fetchAlerts(),
      timeoutPromise(fetchTimeoutMs, "Fetching alerts failed!")
    ])
      .then((alerts: Alert[]) => {
        dispatch({
          type: "SETT_ALERTS",
          payload: alerts
        });
      })
      .catch(err => {
        dispatch({ type: "SETT_ALERTS_FETCH_FAILED" });
        console.error(err);
      });

    Promise.race<any>([
      fetchInformation(),
      timeoutPromise(fetchTimeoutMs, "Fetching information failed!")
    ])
      .then((information: Information[]) => {
        dispatch({
          type: "SETT_INFORMATION",
          payload: information
        });
      })
      .catch(err => {
        dispatch({ type: "SETT_INFORMATION_FETCH_FAILED" });
        console.error(err);
      });

    Promise.race<any>([
      fetchYourSituation(),
      timeoutPromise(fetchTimeoutMs, "Fetching 'whats your situation' failed!")
    ])
      .then((yourSituation: YourSituation[]) => {
        dispatch({
          type: "SETT_YOUR_SITUATION",
          payload: yourSituation
        });
      })
      .catch(err => {
        dispatch({ type: "SETT_YOUR_SITUATION_FETCH_FAILED" });
        console.error(err);
      });

    Promise.race<any>([
      fetchContexts(),
      timeoutPromise(fetchTimeoutMs, "Fetching contexts failed!")
    ])
      .then((contexts: RoleContext[]) => {
        dispatch({
          type: "SETT_CONTEXTS",
          payload: contexts
        });
      })
      .catch(err => {
        dispatch({ type: "SETT_CONTEXTS_FETCH_FAILED" });
        console.error(err);
      });

    Promise.race<any>([
      fetchRelated(),
      timeoutPromise(fetchTimeoutMs, "Fetching related info failed!")
    ])
      .then((relatedInfo: RelatedInfo[]) => {
        dispatch({
          type: "SETT_RELATED_INFO",
          payload: relatedInfo
        });
      })
      .catch(err => {
        dispatch({ type: "SETT_RELATED_INFO_FETCH_FAILED" });
        console.error(err);
      });

    fetchFrontpage()
      .then((frontpage: Frontpage[]) => {
        if (!frontpage || !frontpage[0]) {
          return Error("Fetching frontpage data failed!");
        }

        dispatch({
          type: "SETT_FRONTPAGE",
          payload: frontpage[0]
        });
      })
      .catch(console.error);

    hookChatbotOpenWithGaEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page />;
}

export default App;
