import React from "react";
import Task from "./Task";
import "../styles/Main.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      filter: "all",
      chkboxAllCompleted: false
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.completeAll = this.completeAll.bind(this);
  }

  onKeyPress(event) {
    if (event.key === "Enter") {
      const { value } = event.target;
      this.props.updateState(
        value,
        false,
        `task${this.props.parentState.tasks.length}`
      );
      this.setState(() => {
        return { value: "" };
      });
    }
  }

  onChange(event) {
    const { myValue } = event.target;
    this.setState(() => {
      return {
        value: myValue
      };
    });
  }

  componentDidUpdate() {
    this.props.parentState.tasks.map((task, i) => {
      if (task.editable) {
        document.getElementById(`taskLabel${i}`).focus();
      }
      return task;
    });
    this.handleLogic();
  }

  handleLogic = () => {
    let logic = true;
    for (let i = 0; i < this.props.parentState.tasks.length; i++) {
      if (!this.props.parentState.tasks[i].completed) {
        logic = false;
      }
    }
    if (this.state.chkboxAllCompleted !== logic) {
      this.setState(() => {
        return {
          chkboxAllCompleted: logic
        };
      });
    }
  };

  handleIncomplete = event => {
    const { checked, id } = event.target;
    const arr = [...this.props.parentState.tasks];
    this.props.changeTasks(
      arr.map((task, i) => {
        if (task.taskID === id) {
          task.completed = checked;
        }
        return task;
      })
    );
  };

  handleRadio = event => {
    const { value } = event.target;
    this.setState(() => {
      return {
        filter: value
      };
    });
  };

  completeAll = event => {
    const { checked } = event.target;
    if (checked) {
      this.props.changeTasks(
        this.props.parentState.tasks.map(task => {
          task.completed = true;
          return task;
        })
      );
    } else {
      this.props.changeTasks(
        this.props.parentState.tasks.map(task => {
          task.completed = false;
          return task;
        })
      );
    }
  };

  doubleEdit = event => {
    const { id } = event.target;
    this.props.changeTasks(
      this.props.parentState.tasks.map(task => {
        if (task.taskID.substring(4) === id.substring(9)) {
          task.editable = true;
          //task.focus = true;
        }
        return task;
      })
    );
  };

  destroyClick = event => {
    const id = event.target.id;
    const arr = [...this.props.parentState.tasks];
    let i = 0;
    while (i < arr.length) {
      if (arr[i].taskID.substring(4) === id.substring(10)) {
        arr.splice(i, 1);
        break;
      }
      i++;
    }
    this.props.changeTasks(
      arr.map((task, i) => {
        task.taskID = `task${i}`;
        return task;
      })
    );
  };

  clearCompleted = () => {
    const arr = [...this.props.parentState.tasks];
    let i = 0;
    while (i < arr.length) {
      if (arr[i].completed) {
        arr.splice(i, 1);
      } else {
        i++;
      }
    }
    this.props.changeTasks(
      arr.map((task, i) => {
        task.taskID = `task${i}`;
        return task;
      })
    );
  };

  doubleBlur = () => {
    this.props.changeTasks(
      this.props.parentState.tasks.map((task, i) => {
        if (task.editable === true) {
          task.editable = false;
          task.taskName = document.getElementById(`taskLabel${i}`).innerHTML;
        }
        return task;
      })
    );
  };

  doubleKeyPress = event => {
    if (event.key === "Enter") {
      this.props.changeTasks(
        this.props.parentState.tasks.map((task, i) => {
          if (task.editable === true) {
            task.editable = false;
            task.taskName = document.getElementById(`taskLabel${i}`).innerHTML;
          }
          return task;
        })
      );
    }
  };

  render = () => {
    if (this.props.parentState.tasks.length === 0) {
      return (
        <main>
          <div className="textInputContainer">
            <input
              id="textInput"
              type="text"
              value={this.state.value}
              placeholder="What needs to be done?"
              onChange={this.onChange}
              onKeyDown={this.onKeyPress}
            />
          </div>
        </main>
      );
    } else {
      return (
        <main>
          <div className="textInputContainer">
            <input
              id="hiddenInput"
              type="checkbox"
              onClick={this.completeAll}
              checked={this.state.chkboxAllCompleted}
            />
            <label className="allCompleted" htmlFor="hiddenInput">
              >
            </label>
            <input
              id="textInput"
              type="text"
              value={this.state.value}
              placeholder="What needs to be done?"
              onChange={this.onChange}
              onKeyDown={this.onKeyPress}
            />
          </div>
          <div>
            {this.props.parentState.tasks.map((task, i) => {
              if (this.state.filter === "active" && !task.completed) {
                return (
                  <Task
                    task={task}
                    index={i}
                    handleIncomplete={this.handleIncomplete}
                    doubleEdit={this.doubleEdit}
                    doubleBlur={this.doubleBlur}
                    doubleKeyPress={this.doubleKeyPress}
                    destroyClick={this.destroyClick}
                  />
                );
              } else if (this.state.filter === "complete" && task.completed) {
                return (
                  <Task
                    task={task}
                    index={i}
                    handleIncomplete={this.handleIncomplete}
                    doubleEdit={this.doubleEdit}
                    doubleBlur={this.doubleBlur}
                    doubleKeyPress={this.doubleKeyPress}
                    destroyClick={this.destroyClick}
                  />
                );
              } else if (this.state.filter === "all") {
                return (
                  <Task
                    task={task}
                    index={i}
                    handleIncomplete={this.handleIncomplete}
                    doubleEdit={this.doubleEdit}
                    doubleBlur={this.doubleBlur}
                    doubleKeyPress={this.doubleKeyPress}
                    destroyClick={this.destroyClick}
                  />
                );
              }
              return null;
            })}
            {
              <div className="mainBottomContainer">
                <label className="itemCounter">{`${this.props.incomplete()} item left`}</label>
                <div className="filterContainer">
                  <input
                    type="radio"
                    id="radioAll"
                    value="all"
                    name="filterManager"
                    checked={this.state.filter === "all"}
                    onChange={this.handleRadio}
                  />
                  <label htmlFor="radioAll">All</label>
                  <input
                    type="radio"
                    id="radioActive"
                    name="filterManager"
                    value="active"
                    checked={this.state.filter === "active"}
                    onChange={this.handleRadio}
                  />
                  <label htmlFor="radioActive">Active</label>
                  <input
                    type="radio"
                    id="radioCompleted"
                    name="filterManager"
                    value="complete"
                    checked={this.state.filter === "complete"}
                    onChange={this.handleRadio}
                  />
                  <label htmlFor="radioCompleted">Completed</label>
                </div>
                {this.props.complete() > 0 && (
                  <div className="clearContainer">
                    <input
                      onClick={this.clearCompleted}
                      type="button"
                      id="clearButton"
                    />
                    <label htmlFor="clearButton" className="clearLabel">
                      Clear completed
                    </label>
                  </div>
                )}
              </div>
            }
          </div>
        </main>
      );
    }
  };
}

export default Main;
