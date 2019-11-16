import React from "react";

const Task = props => {
  return (
    <div className="taskContainer">
      <input
        id={`task${props.index}`}
        onChange={props.handleIncomplete}
        className="taskCheckbox"
        type="checkbox"
        checked={props.task.completed}
      />
      <label htmlFor={`task${props.index}`} className="hiddenLabel" />
      <label
        id={`taskLabel${props.index}`}
        contentEditable={props.task.editable}
        autoFocus={props.task.focus}
        className="taskLabel"
        onDoubleClick={props.doubleEdit}
        onBlur={props.doubleBlur}
        onKeyDown={props.doubleKeyPress}
      >
        {props.task.taskName}
      </label>
      <input
        type="button"
        id={`taskButton${props.index}`}
        onClick={props.destroyClick}
        className="hiddenButton"
      />
      <label
        htmlFor={`taskButton${props.index}`}
        className="hiddenButtonLabel"
      />
    </div>
  );
};

export default Task;
