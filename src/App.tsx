import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Todo } from "./services/ToDoService";
import { ToDoComponent } from "./components/ToDoComponent";

function App() {
  const [todo, setTodo] = useState(new Todo("", false));
  const [todos, setTodos] = useState([] as Todo[]);

  const onChangeHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case "title":
        if (!e.currentTarget.value.length && !todo.title.length) return;
        setTodo(new Todo(e.currentTarget.value, todo.done));
        break;
      case "done":
        setTodo(new Todo(todo.title, e.currentTarget.checked));
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // store the todo
    setTodos([...todos, todo]);
    setTodo(new Todo("", false));
  };

  return (
    <article>
      <section>
        <button onClick={() => Todo.saveTodos(todos)}>Save Todos</button>
        <button
          onClick={() => Todo.loadTodos().then((todos) => setTodos(todos))}
        >
          Load Todos
        </button>
      </section>
      <section>
        <form onSubmit={onSubmitHandler}>
          <p>
            <label>What do you want to do?</label>
            <input
              type="text"
              name="title"
              onChange={onChangeHandler}
              value={todo.title}
              required
            ></input>
          </p>
          <p>
            <label>
              <input
                type="radio"
                name="done"
                onChange={onChangeHandler}
                checked={todo.done}
              ></input>
              Is it already done?
            </label>
          </p>
          <p>
            <button type="submit">Add ToDo</button>
          </p>
        </form>
      </section>
      <section>
        <ol>
          {todos.map((t) => (
            <ToDoComponent
              key={t.title}
              todo={t}
              doneButtonOnClick={() => {
                t.setDone(!t.done);
                setTodo(new Todo(todo.title, todo.done));
              }}
              removeOnClick={() => setTodos(todos.filter((todo) => todo != t))}
            />
          ))}
        </ol>
      </section>
    </article>
  );
}

export default App;
