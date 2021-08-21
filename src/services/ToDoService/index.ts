const SERVER_ADDRESS = '//127.0.0.1:3001';

class ServerAPI {

  static loadToDos(id: string) {
    return fetch(
      SERVER_ADDRESS + '/todos/' + id
    )
      .then(response => response.json() as Promise<Todo[]>)
      .catch(() => Promise.resolve([]));
  }

  static saveToDos(id: string, todos: Todo[]){
    fetch(
      SERVER_ADDRESS + '/todos/' + id,
      {
        body: JSON.stringify({ todos }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

export type Attribute = {
  name: string;
  type: string;
  value: any;
};

export class Todo {
  constructor(public title: string, public done: boolean, public attributes: any[] = []) {}
  setTitle(newTitle: string) {
    this.title = newTitle;
  }
  setDone(newDone: boolean) {
    this.done = newDone;
  }

  static saveTodos = ServerAPI.saveToDos;

  static loadTodos = ServerAPI.loadToDos;
}
