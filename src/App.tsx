import React, { useState } from "react";
import "./App.css";
import { Todo } from "./services/ToDoService";
import { ToDoComponent } from "./components/ToDoComponent";

function App() {
  const [todo, setTodo] = useState(new Todo("", false));
  const [todos, setTodos] = useState([] as Todo[]);
  const [id, setId] = useState('');

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
        <label>
          Whose todos are these?
          <input
            type="text"
            name="id"
            onInput={e => setId(e.currentTarget.value)}
          />
        </label>
        <br />
        <button onClick={() => Todo.saveTodos(id, todos)}>Save Todos</button>
        <button
          onClick={() =>
            Todo.loadTodos(id)
              .then((todos) => {
                setTodos(todos.map(t => new Todo(t.title, t.done, t.attributes)))
              })
          }
        >
          Load Todos
        </button>
      </section>
      <section>
        <form onSubmit={onSubmitHandler}>
          <p>
            <label>
              What do you want to do?
              <input
                type="text"
                name="title"
                onChange={onChangeHandler}
                value={todo.title}
                required
              ></input>
            </label>
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
