import React from "react";
import Register from "./register";
export default class Homepage extends React.Component {
  state = {
    navigateStatus: false
  };
  navigateToRegister = () => {
    this.setState({
      navigateStatus: true
    });
  };
  render() {
    return (
      <div
        className={
          this.state.navigateStatus
            ? "container homepage-no-container"
            : "container homepage-container"
        }
      >
        <div className={this.state.navigateStatus ? "not-existed" : "existed"}>
          <div className="title">欢迎参加南京邮电大学校科协新生杯</div>
          <div className="title">
            点击
            <span className="homepage-font" onClick={this.navigateToRegister}>
              注册
            </span>
            报名参加本次比赛
          </div>
        </div>
        {this.state.navigateStatus === true ? <Register /> : null}
      </div>
    );
  }
}

