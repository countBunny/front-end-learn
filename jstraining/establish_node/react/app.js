import React from "react";
import ReactDOM from "react-dom";

class MyTitle extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      text: "World"
    };
  }

  handleClick() {
    this.setState({
      text: "Clicked"
    });
  }

  render() {
    return <h1 onClick={this.handleClick.bind(this)} style={{ color: "red" }}>
        {'Hello ' + this.state.text}
  </h1>;
  }
}

ReactDOM.render(<MyTitle />, document.getElementById("app"));
