import React, { Component } from "react";
import "./App.css";
import { observer } from "mobx-react";

import Store from "./stores/todo-store";

const NameInput = observer(({store}) => <div className="index">
        <p>{store.decorated}</p>
        <input
          type="text"
          defaultValue={store.name}
          onChange={event =>
            (store.name = event.currentTarget.value)
          }
        />
      </div>
);

const store = new Store();

class App extends Component {
  render() {
    return (<div className="App">
        <NameInput store={store} />
      </div>
    );
  }
}

export default App;
