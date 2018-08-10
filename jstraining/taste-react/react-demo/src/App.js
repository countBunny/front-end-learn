import React, { Component } from "react";
import "./App.css";
import { observer } from "mobx-react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import { Store, TodoStore } from "./stores/todo-store";
import reducer from "./redux/reducer";

const NameInput = observer(({ store }) => (
  <div className="index">
    <p>{store.decorated}</p>
    <input
      type="text"
      defaultValue={store.name}
      onChange={event => (store.name = event.currentTarget.value)}
    />
  </div>
));

const TodoList = observer(({ todoList }) => (
  <div>
    {store.report}
    {/* <ul>
      {todoList.todos.length > 0 ? (
        todoList.todos.map((todo, idx) => <TodoView todo={todo} key={idx} />)
      ) : (
        <span> empty </span>
      )}
    </ul> */}
    {store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null}
    <button onClick={this.onNewTodo}>New Todo</button>
    <small> (double-click a todo to edit)</small>
  </div>
));
TodoList.onNewTodo = () => {
  this.props.store.addTodo(prompt("Enter a new todo:", "coffee plz"));
};

// const TodoView = observer(({ todo, key }) => (
//   <li onDoubleClick={this.onRename}>
//     <input
//       type="checkbox"
//       checked={todo.completed}
//       onChange={this.onToggleCompleted}
//     />
//     {todo.task}
//     {todo.assignee ? <small>{todo.assignee.name}</small> : null}
//   </li>
// ));

// TodoView.onToggleCompleted = () => {
//   const todo = this.props.todo;
//   todo.completed = !todo.completed;
// };
// TodoView.onRename = () => {
//   const todo = this.props.todo;
//   todo.task = prompt("Task name", todo.task) || todo.task;
// };

/**
 * redux Component include reducer/TStateProps/TDispatchProps
 * dispatch call reducer to responce to it, then state changed, the Dom been updated
 */
class MyComponent extends Component{
  render(){
    return(
      <div className="index">
        <p>{this.props.text}</p>
        <input defaultValue={this.props.name} onChange={this.props.onChange} />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    text:state.text,
    name:state.name
  }
}
/**
 * 定义的是哪些用户的操作应该当作Action，传给Store。
 * @param {redux dispatch method to send action} dispatch 
 */
function mapDispatchToProps(dispatch) {
  return {
    onChange: (e) => dispatch({
      type:'change',
      payload: e.target.value
    })
  }
}

/**
 * use connect add more props to MyComponent
 * 纯组件 转换成 
 */
const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);

const store = new Store();
const todoStore = new TodoStore();
console.log(store);
console.log(todoStore);

/**
 * create store to refresh dom 
 * action -> dispatcher -> store -> react-state-change -> DOM
 */
const reduxStore = createStore(reducer);

reduxStore.subscribe(() =>
  console.log(reduxStore.getState())
)

/**
 * 为了把Store传入组件，必须使用 Redux 提供的Provider组件在应用的最外面，包裹一层。
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <NameInput store={store} />
        {/* <TodoView todoList={todoStore} /> */}
        <Provider store={reduxStore}>
          <ConnectedComponent />
        </Provider>
      </div>
    );
  }
}

export default App;
