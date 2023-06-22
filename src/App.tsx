import React, { useState, SyntheticEvent } from "react";
import "./App.css";
import { Time, Todo } from "./services/ToDoService";
import { ToDoComponent } from "./components/ToDoComponent";

function App() {
  const [todo, setTodo] = useState(new Todo("", false, 0, Time.day));
  const [todos, setTodos] = useState([] as Todo[]);

  const onChangeHandler = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    console.log(e.currentTarget.name);

    switch (e.currentTarget.name) {
      case "title":
        if (!e.currentTarget.value.length && !todo.title.length) return;
        setTodo(new Todo(e.currentTarget.value, todo.done, todo.count, todo.frequency));
        break;
      case "done":
        setTodo(new Todo(todo.title, e.currentTarget.checked, todo.count, todo.frequency));
        break;
      case "count":
        setTodo(new Todo(todo.title, todo.done, e.currentTarget.valueAsNumber, todo.frequency));
        break;
      default:
        break;
    }
  };

  const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const indexOfValue = Object.keys(Time).indexOf(e.target.value)
    const enumValue = Object.values(Time)[indexOfValue];

    setTodo(new Todo(todo.title, todo.done, todo.count, Time[enumValue]))
  };

  const onSubmitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // store the todo
    setTodos([...todos, todo]);
    setTodo(new Todo("", false, 0, Time.day));
  };

  const timeOptions = [
    {
      label: "Day",
      value: Time.day,
    },
    {
      label: "Week",
      value: Time.week,
    },
    {
      label: "Month",
      value: Time.month,
    }
  ];

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
                type="checkbox"
                name="done"
                onChange={onChangeHandler}
                checked={todo.done}
              ></input>
              Is it already done?
            </label>
          </p>
          <p>
            <label>
              <input
                type="number"
                name="count"
                onChange={onChangeHandler}
                value={todo.count}
              ></input>
              Count
            </label>
          </p>
          <p>
            <label>
            <select
              value={todo.frequency}
              onChange={onSelectHandler}
            >
              {timeOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
              Frequency
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
                setTodo(new Todo(todo.title, todo.done, todo.count, todo.frequency));
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
