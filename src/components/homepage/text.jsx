import React from "react";
export default class Text extends React.Component {
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
      <div>
        <div className="title">欢迎参加南京邮电大学校科协新生杯</div>
        <div className="title">
          点击
          <span onClick={navigateToRegister}>注册</span>
          报名参加本次比赛
        </div>
      </div>
    );
  }
}
