import * as React from "react";
import { useGetUnclaimed, claim, unclaim } from "../services/jobs";
import { Calendar, CalendarEvent } from "../components/calendar";
import { Script } from "gatsby";
import { Popup } from "../components/popup";
import telegramParamToJson from "../utils/telegramParamToJson";
const App = () => {
  const [jobs, loaded] = useGetUnclaimed();
  const popup = React.createRef<Popup>();
  React.useEffect(() => {
    if (!loaded) return;
    window.Telegram.WebApp.ready();
    console.log(telegramParamToJson(window.Telegram.WebApp.initData));
  });
  const onEventClick = (event: CalendarEvent) => {
    popup.current?.show(event).onAction((action) => {});
  };
  return (
    <main style={{ position: "relative" }}>
      <Script src="https://telegram.org/js/telegram-web-app.js" />
      <Popup ref={popup} />
      <Calendar events={jobs} onEventClick={onEventClick} />
    </main>
  );
};

export default App;

export const Head = () => <title>Tidy Calendar</title>;
