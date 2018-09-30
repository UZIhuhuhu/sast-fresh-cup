import React, { Component } from "react";
// import './App.css';
import Navigate from "../src/components/navigate";
// import Router from "react-router";
// import Login from "../src/components/login";
class App extends Component {
  // constructor() {
  //   // super(props);
  //   // this.state = {
  //   //   navigateIndex: 0
  //   // };
  // }
  render() {
    return (
      <div className="App">
        <Navigate />
        {/* <Login /> */}
      </div>
    );
  }
}

export default App;
