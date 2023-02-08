import * as React from "react";
import { useGetUnclaimed } from "../services/jobs";
import { Calendar } from "../components/calendar";
const App = () => {
  const jobs = useGetUnclaimed();

  return (
    <main>
      <Calendar events={jobs} />
    </main>
  );
};

export default App;

export const Head = () => <title>Home Page</title>;
