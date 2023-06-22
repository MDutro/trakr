const server = {
  saved: Promise.resolve("[]"),
};

export type Attribute = {
  name: string;
  type: string;
  value: any;
};

export enum Time {
  day = "day", 
  week = "week",
  month= "month"
}

export class Todo {
  private attributes: Attribute[] = [];
  constructor(public title: string, public done: boolean = false, public count: number = 0, public frequency: Time = Time.day ) {}
  setTitle(newTitle: string) {
    this.title = newTitle;
  }
  setDone(newDone: boolean) {
    this.done = newDone;
  }

  setCount(newCount: number) {
    this.count = newCount;
  }

  setFrequency(newFrequency: Time) {
    this.frequency = newFrequency
  }

  static saveTodos(todos: Todo[]) {
    // send the ToDo[] to the server, in json
    server.saved = Promise.resolve(JSON.stringify(todos));
  }

  static loadTodos(): Promise<Todo[]> {
    return server.saved.then(JSON.parse);
  }
}
