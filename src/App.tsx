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
import { useStore } from "./store/Provider";
import { hookChatbotOpenWithGaEvent } from "./utils/chatbotUtils";

function App() {
  const [, dispatch] = useStore();

  const fetchAndDispatchWithTimeout = (
    fetchCall: () => Promise<any>,
    dispatchOnSuccess: any,
    dispatchOnError: any) =>
  {
    Promise.race<any>([
      fetchCall(),
      timeoutPromise(fetchTimeoutMs, "Fetch failed!")
    ])
      .then((data: any) => {
        dispatch({
          type: dispatchOnSuccess,
          payload: data
        });
      })
      .catch(err => {
        dispatch({ type: dispatchOnError });
        console.error(err);
      });
  };

  useEffect(() => {
    fetchAndDispatchWithTimeout(fetchAlerts, "SETT_ALERTS", "SETT_ALERTS_FAILED");
    fetchAndDispatchWithTimeout(fetchInformation, "SETT_INFORMATION", "SETT_INFORMATION_FETCH_FAILED");
    fetchAndDispatchWithTimeout(fetchYourSituation, "SETT_YOUR_SITUATION", "SETT_YOUR_SITUATION_FETCH_FAILED");
    fetchAndDispatchWithTimeout(fetchContexts, "SETT_CONTEXTS", "SETT_CONTEXTS_FETCH_FAILED");
    fetchAndDispatchWithTimeout(fetchRelated, "SETT_RELATED_INFO", "SETT_RELATED_INFO_FETCH_FAILED");

    fetchFrontpage()
      .then((frontpage: any) => {
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
