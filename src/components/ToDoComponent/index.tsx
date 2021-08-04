import { Todo } from "../../services/ToDoService";

export const ToDoComponent = ({
  todo,
  doneButtonOnClick,
  removeOnClick,
}: {
  todo: Todo;
  doneButtonOnClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
  removeOnClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
}) => {
  return (
    <li>
      <p>Title: {todo.title}</p>
      <p>Done: {String(todo.done)}</p>
      {!todo.done ? (
        <button onClick={doneButtonOnClick}>Mark Done</button>
      ) : (
        <button onClick={doneButtonOnClick}>Mark not Done</button>
      )}
      <button onClick={removeOnClick}>Remove {todo.title} todo</button>
    </li>
  );
};
