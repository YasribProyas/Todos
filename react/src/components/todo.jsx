import React from "react";
import { useState } from "react";

export default function Todo({ todoObj, deleteTodo }) {
  const [checked, setChecked] = useState(todoObj.done);

  const onCheckboxChange = () => {
    todoObj.done = !todoObj.done;
    setChecked(todoObj.done);
  };
  const onDelete = () => {
    deleteTodo(todoObj);
  };

  return (
    <div className="todo">
      <span className="todo-text">
        <input
          type="checkbox"
          name="todo1"
          id="todo1"
          checked={checked}
          onChange={onCheckboxChange}
        />
        <p>{todoObj.content}</p>
      </span>
      <span className="todo-options">
        <button>edit</button>
        <button onClick={onDelete}>delete</button>
      </span>
    </div>
  );
}
