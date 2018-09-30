import React from "react";
import Register from "./register";
import Text from "./homepage/text";
export class HomePage extends React.Component {
  render() {
    return (
      <div className="container homepage-container">
        {this.state.navigateStatus === true ? <Register /> : <Text />}
      </div>
    );
  }
}
