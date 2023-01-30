import * as React from "react";
import { Router } from "@reach/router";
import { Context } from "services/Provider";
import Stocktaking from "views/Stocktaking";
import TodoList from "views/Todo";
const App = ({ location }) => {
  return (
    <Context.Consumer>
      {(ctx) => {
        return (
          <main>
            <Router>
              <TodoList path="/*" ctx={ctx} />
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
