import React, {useEffect} from 'react';
import { Page } from "./page/Page";
import { fetchAlerts, fetchTimeoutMs, timeoutPromise } from "./clients/api";
import { Alert } from "./utils/sanity/endpoints/alert";
import { useDispatch } from "./redux/Provider";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.race<any>([fetchAlerts(), timeoutPromise(fetchTimeoutMs, "Fetching alerts failed!")])
      .then((alerts: Array<Alert>) => {
        dispatch({
          type: "SETT_ALERTS",
          payload: alerts
        });
      })
      .catch(err => {
        dispatch({ type: "SETT_ALERTS_FETCH_FAILED" });
        console.error(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page />;
}

export default App;
