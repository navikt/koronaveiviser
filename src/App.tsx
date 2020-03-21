import React, {useEffect} from 'react';
import { Page } from "./page/Page";

function App() {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/alerts`)
      .then(result => result.json())
      .then(json => console.log(json))
      .catch(error => console.log(error))
  });

  return <Page />;
}

export default App;
