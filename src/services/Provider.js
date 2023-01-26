import React, { useEffect, useState } from "react";
import { Script } from "gatsby";
import telegramParamToJson from "utils/telegramParamToJson";
export const Context = React.createContext();

const Provider = ({ children }) => {
  const isClockedIn = true;
  const [Telegram, setTelegram] = useState(null);
  useEffect(() => {
    if (!Telegram) return;
    Telegram.WebApp.ready();
    //Simulate receiving initdata from telegram if no data present
    const queryString =
      "query_id=AAF9JjxpAAAAAH0mPGl2zflJ&user=%7B%22id%22%3A1765549693%2C%22first_name%22%3A%22Andrew%22%2C%22last_name%22%3A%22Gray%22%2C%22username%22%3A%22natreve%22%2C%22language_code%22%3A%22en%22%7D&auth_date=1674658969&hash=1621aa353d86ed70c61414a1c30cd6b49809488e2dd7155d33f017fb3d4868ca";
    const initData =
      Telegram.WebApp.initData || telegramParamToJson(queryString);

    console.log(Telegram);
  }, [Telegram]);

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        onLoad={(e) => setTelegram(window.Telegram)}
      />
      <Context.Provider value={{ isClockedIn, Telegram }}>
        {children}
      </Context.Provider>
    </>
  );
};

const App = ({ element }) => <Provider>{element}</Provider>;
export default App;
