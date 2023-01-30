import React from "react";
import PropTypes from "prop-types";
import * as css from "./css.module.scss";
import { v4 } from "uuid";
const Task = (props) => {
  const toggleStatus = (e, id) => {
    // e.target.parentNode.classList.toggle(css.completed);

    props.onStatusChange(id);
    return e.target.checked;
  };
  const completed = props.completed ? css.completed : "";
  return (
    <div className={`${css.task} ${completed}`}>
      <input
        name={props.id}
        id={props.id}
        type="checkbox"
        onChange={(e) => toggleStatus(e, props.id)}
        defaultChecked={props.completed}
      />
      <label htmlFor={props.id}>{props.name}</label>
    </div>
  );
};
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      filteredTasks: props.tasks,
      filters: [
        { name: "All", active: true },
        { name: "Active" },
        { name: "Completed" },
      ],
    };
  }
  onStatusChange = (id) => {
    const tasks = this.state.tasks.map((task) => {
      if (task.id === id) task.completed = !task.completed;
      return task;
    });
    this.setState({ tasks });
  };
  filterTasks = (id) => {
    let filteredBy = "All";
    let filteredTasks = [];

    const filters = this.state.filters.map((filter, i) => {
      if (id === i) {
        filteredBy = filter.name;
        return { ...filter, active: true };
      }

      return { ...filter, active: false };
    });

    this.setState({ filters });
  };
  onComplete = () => {
    let payload = [];
    for (let index = 0; index < this.state.tasks.length; index++) {
      const task = this.state.tasks[index];
      
      if (task.completed) {
        payload.push({ name: task.name, completed: true });
        continue;
      }
      payload.push({ name: task.name, completed: false });
    }
    this.props.onComplete(payload);
  };
  render() {
    const { props, state, onStatusChange, filterTasks } = this;

    return (
      <div className={css.todo}>
        <div className={css.header}>
          <h1>{props.name}</h1>
          <div className={css.tools}>
            <div className={css.count}>{props.id}</div>
            {/* <div className={css.count}>{state.tasks.length} tasks</div> */}
            <div className={css.filters}>
              {/* {state.filters.map((filter, id) => {
                return (
                  <button
                    className={filter?.active ? css.active : ""}
                    key={id}
                    onClick={() => filterTasks(id)}
                  >
                    {filter.name}
                  </button>
                );
              })} */}
            </div>
          </div>
        </div>
        <div className={css.tasks}>
          {state.tasks.map((task, id) => {
            task.id = `${id}`;
            return <Task key={id} {...task} onStatusChange={onStatusChange} />;
          })}
        </div>
        <button className={css.done} onClick={this.onComplete}>
          Done
        </button>
      </div>
    );
  }
}
Todo.propTypes = {
  name: PropTypes.string,
  tasks: PropTypes.array,
  onComplete: PropTypes.func,
};
Todo.defaultProps = {
  name: ``,
  tasks: [],
  onComplete: () => {},
};
Task.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
};

Task.defaultProps = {
  id: v4(),
  name: "",
  description: "",
};
export default Todo;
