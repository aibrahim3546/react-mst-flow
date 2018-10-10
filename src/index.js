import React from "react";
import ReactDOM from "react-dom";

import Route from './route';

// class HelloMessage extends React.Component {
//   render() {
//     return <div>Hello {this.props.name}</div>;
//   }
// }

const mountNode = document.getElementById("app");
ReactDOM.render(<Route />, mountNode);