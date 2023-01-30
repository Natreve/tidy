import React, { useEffect, useState } from "react";
import Todo from "components/Todo";
const TodoList = (props) => {
  const { ctx } = props;
  const [state, setState] = useState({ name: "", id: null });
  const tasks = [
    {
      name: "Detail cleaning of living room, kitchen, washroom and bedroom(s).",
    },
    { name: "Check drawers and other areas for guests’ personal items." },
    { name: "Check all appliances." },
    {
      name: "Replenish supplies such as toiletries, snacks, garbage bags, and linen.",
    },
    { name: "Damages form (if applicable)." },
    { name: "Stocktaking (if applicable)." },
    { name: "Live video of the unit." },
    {
      name: "Place key in lockbox and scramble code (send new code if code has been changed).",
    },
  ];
  const onComplete = (tasks) => {
    console.log(tasks);
  };
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const name = urlParams.get("displayName");
    setState({ name, id });
    if (state.id) ctx.Telegram.WebApp.ready();
  }, [ctx]);

  return (
    <Todo
      name={state.name}
      id={state.id}
      tasks={tasks}
      onComplete={onComplete}
    />
  );
};

export default TodoList;
