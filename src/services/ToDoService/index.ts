import { useState } from "react";

const server = {
  saved: Promise.resolve("[]"),
};

let idSerial = 1;
export class Todo {
  private id: number = idSerial++;
  constructor(public title: string, public done: boolean) {}
  setTitle(newTitle: string) {
    this.title = newTitle;
  }
  setDone(newDone: boolean) {
    this.done = newDone;
  }

  static saveTodos(todos: Todo[]) {
    // send the ToDo[] to the server, in json
    server.saved = Promise.resolve(JSON.stringify(todos));
  }

  static loadTodos(): Promise<Todo[]> {
    return server.saved.then(JSON.parse);
  }
}
