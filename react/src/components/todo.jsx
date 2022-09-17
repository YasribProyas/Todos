import React from "react";
import { useRef } from "react";
import { useState } from "react";

export default function Todo({ todoObj, deleteTodo }) {
  const [checked, setChecked] = useState(todoObj.done);
  const [editingState, setEditingState] = useState(false);
  const [editText, setEditText] = useState(todoObj.content);

  const onCheckboxChange = () => {
    todoObj.done = !todoObj.done;
    setChecked(todoObj.done);
  };
  const onDelete = () => {
    deleteTodo(todoObj);
  };
  const onEdit = (e) => {
    if (editingState) {
      todoObj.content = editText;
    }
    setEditingState(!editingState);
  };
  const onEditButton = (e) => {
    onEdit(e);
  };
  const onEditChange = (e) => {
    setEditText(e.target.value);
  };
  const onEnter = (e) => {
    if (e.key == "Enter") onEdit();
  };
  const focusRef = (e) => {
    if (e) {
      e.focus();
      e.addEventListener("focusout", onEdit);
    }
  };

  const logPls = (e) => console.log(e);

  return (
    <li className="todo">
      <span className="todo-text">
        <input
          type="checkbox"
          name="todo1"
          id="todo1"
          checked={checked}
          onChange={onCheckboxChange}
        />
        {editingState ? (
          <input
            className="editInput"
            type="text"
            name="todo-edit"
            id="todo-edit"
            value={editText}
            onChange={onEditChange}
            onKeyDown={onEnter}
            ref={focusRef}
          />
        ) : (
          <p onDoubleClick={onEdit}>{todoObj.content}</p>
        )}
      </span>
      <span className="todo-options">
        <button onClick={onEditButton}>{editingState ? "done" : "edit"}</button>
        <button onClick={onDelete}>delete</button>
      </span>
    </li>
  );
}
