import React, {useEffect} from 'react';
import logo from './assets/logo.svg';

function App() {

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/alerts`)
        .then(result => result.json())
        .then(json => console.log(json))
        .catch(error => console.log(error))
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
