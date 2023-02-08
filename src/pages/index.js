import * as React from "react";
import { useGetUnclaimed } from "../services/jobs";
import { Calendar } from "../components/calendar";
import { Script } from "gatsby";
const App = () => {
    const [jobs, loaded] = useGetUnclaimed();
    React.useEffect(() => {
        //if jobs have been loaded telegram app is ready
        if (loaded)
            window.Telegram.WebApp.ready();
    });
    return (React.createElement("main", null,
        React.createElement(Script, { src: "https://telegram.org/js/telegram-web-app.js" }),
        React.createElement(Calendar, { events: jobs })));
};
export default App;
export const Head = () => React.createElement("title", null, "Home Page");
