import * as React from "react";
import { useGetUnclaimed } from "../services/jobs";
import { Calendar } from "../components/calendar";
import { Script } from "gatsby";
const App = () => {
  const jobs = useGetUnclaimed();
  React.useEffect(() => {
    console.log(window.Telegram);
  });
  return (
    <main>
      <Script src="https://telegram.org/js/telegram-web-app.js" />
      <Calendar events={jobs} />
    </main>
  );
};

export default App;

export const Head = () => <title>Home Page</title>;
