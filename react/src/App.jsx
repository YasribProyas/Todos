import { useState } from "react";

import "./App.css";
import "./styles/style.scss";

import Todo from "./components/todo";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  const onTodoInputChange = (e) => {
    setTodoInput(e.target.value);
  };
  const onTodoAdd = () => {
    if (todoInput.length < 1) return;
    setTodoList([
      {
        content: todoInput,
        done: false,
      },
      ...todoList,
    ]);
    setTodoInput("");
  };
  const deleteTodo = (todoObj) => {
    setTodoList(todoList.filter((todo) => todo != todoObj));
  };

  return (
    <div className="App">
      <header>
        <h1 id="heading">TODO</h1>
      </header>

      <main>
        <section className="input-area">
          <input
            type="text"
            id="todo-input"
            value={todoInput}
            onChange={onTodoInputChange}
          />
          <button onClick={onTodoAdd}>add</button>
        </section>

        <section id="todos" className="todos">
          {todoList.map((todo, k) => (
            <Todo todoObj={todo} deleteTodo={deleteTodo} key={k} />
          ))}
          {todoList.length < 1 && (
            <h2 id="empty-todo-heading">The list is currently empty</h2>
          )}
        </section>

        <input type="checkbox" name="online" id="online" />
        <label htmlFor="online">online</label>
      </main>
    </div>
  );
}

export default App;
