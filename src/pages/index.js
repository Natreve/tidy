import * as React from "react";
import { Router } from "@reach/router";
import { Context } from "services/Provider";
import Bookings from "views/Bookings";
import Stocktaking from "views/Stocktaking";
const App = ({ location }) => {
  return (
    <Context.Consumer>
      {(ctx) => {
        return (
          <main>
            <Router>
              <Bookings path="/*" ctx={ctx} />
              <Stocktaking path="/stocktaking" ctx={ctx} />
            </Router>
          </main>
        );
      }}
    </Context.Consumer>
  );
};

export default App;

export const Head = () => <title>Home Page</title>;
