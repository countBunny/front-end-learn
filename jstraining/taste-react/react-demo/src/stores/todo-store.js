import { observable, autorun, computed } from "mobx";
import { decorate } from "../../node_modules/mobx/lib/mobx";

class TodoStore {
  todos = [];
  pendingRequests = 0;

  constructor(){
      autorun(()=>{
          console.log(this.report())
      });
  }

  get completedTodosCount() {
    return this.todos.filter(todo => todo.completed === true).length;
  }

  get report() {
    if (this.todos.length === 0) return "<none>";
    return (
      `Next todo: "${this.todos[0].task}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}
decorate(TodoStore,{
  todos: observable,
  pendingRequests: observable,
  completedTodosCount: computed,
  report: computed
});

class Store {
    name ="Bartek";
    get decorated(){
        return `${this.name} is awesome!`;
    }
}

decorate(Store, {
  name: observable,
  decorated: computed
});

export {
  Store,
  TodoStore
};