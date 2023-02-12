import * as React from "react";
import { useGetUnclaimed } from "../services/jobs";
import { Calendar, CalendarEvent } from "../components/calendar";
import { Script } from "gatsby";
import { Popup } from "../components/popup";
const App = () => {
  const [jobs, loaded] = useGetUnclaimed();
  const popup = React.createRef<Popup>();
  React.useEffect(() => {
    //if jobs have been loaded telegram app is ready
    if (loaded) window.Telegram.WebApp.ready();
  });
  const onEventClick = (event: CalendarEvent) => {
    popup.current?.show(event);
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
