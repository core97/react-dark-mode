import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [darkMode, setDarkMode] = useState(getInitialMode());
  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem('dark'));
    const userPrefersDark = getPrefColorsScheme();
    // if mode was saved -> dark / light
    if (isReturningUser) {
      return savedMode;
    } else if (userPrefersDark) {
      // if prefered color scheme is dark -> dark
      return true;
    } else {
      // otherwise -> light
      return false;
    }
  }

  function getPrefColorsScheme() {
    if (!window.matchMedia) return;

    // return true or false
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <nav>
        <div className="toggle-container">
          <span style={{color: darkMode ? "grey" : "yellow"}}>☀</span>
          <span className="toggle">
            <input
              checked={darkMode}
              onChange={() => setDarkMode(prevMode => !prevMode)}
              type="checkbox"
              className="checkbox"
              id="checkbox"
            />
            <label htmlFor="checkbox"></label>
          </span>
          <span style={{color: darkMode ? "slateblue" : "grey"}}>☾</span>
        </div>
      </nav>
      <main>
        <h1>{darkMode ? "Dark Mode" : "Light Mode"}</h1>
        <h2>Toggle the switch to see some magic happen!</h2>
      </main>
    </div>
  );
}

export default App;
