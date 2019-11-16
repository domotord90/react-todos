import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.state = { ...this.state, incomplete: this.state.tasks.length };
    this.updateState = this.updateState.bind(this);
    this.changeTasks = this.changeTasks.bind(this);
  }

  updateState(taskName, completed, taskID) {
    this.setState(previousState => {
      const arr = previousState.tasks.slice();
      arr.push({
        taskName: taskName,
        completed: completed,
        taskID: taskID,
        editable: false,
        focus: false
      });
      return {
        tasks: arr,
        incomplete: previousState.incomplete + 1
      };
    });
  }

  getIncomplete = () => {
    let count = 0;
    this.state.tasks.map(task => {
      if (!task.completed) {
        count++;
      }
      return task;
    });
    return count;
  };

  getComplete = () => {
    let count = 0;
    this.state.tasks.map(task => {
      if (task.completed) {
        count++;
      }
      return task;
    });
    return count;
  };

  changeTasks(arr) {
    this.setState(() => {
      return {
        tasks: arr
      };
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Main
          updateState={this.updateState}
          parentState={this.state}
          changeTasks={this.changeTasks}
          incomplete={this.getIncomplete}
          complete={this.getComplete}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
