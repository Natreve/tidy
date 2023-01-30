import React, { useEffect, useState } from "react";
import { Script } from "gatsby";

export const Context = React.createContext();

const Provider = ({ children }) => {
  const isClockedIn = true;
  const [Telegram, setTelegram] = useState(null);
  
  useEffect(() => {
    if (!Telegram) return;

    function setThemeClass() {
      document.documentElement.className = Telegram.WebApp.colorScheme;
    }
    Telegram.WebApp.onEvent("themeChanged", setThemeClass);
    setThemeClass();
  }, [Telegram]);

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        onLoad={(e) => setTelegram(window.Telegram)}
      />
      <Context.Provider
        value={{
          isClockedIn,
          Telegram,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
};

const App = ({ element }) => <Provider>{element}</Provider>;
export default App;
