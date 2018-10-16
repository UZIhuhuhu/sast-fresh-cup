import React from "react";
import "../../style/index.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Register from "./register";
import Notice from "./notice";
import Login from "./login";
import Homepage from "./homepage";
import Personal from "./personal";
import Answer from "./answer";
// import api from "../../api/index";
// import axios from "axios";
const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};
class Navigate extends React.Component {
  state = {
    navigateIndex: `homepage`,
    isUserLoginStatus: false,
    isAdminName: 0
  };
  navigateNotice = () => {
    this.setState({
      navigateIndex: `notice`
    });
  };
  navigateLogin = () => {
    this.setState({
      navigateIndex: `login`
    });
  };
  navigatePersonalPage = () => {
    this.setState({
      navigateIndex: `personal`
    });
  };
  navigateRegister = () => {
    this.setState({
      navigateIndex: `register`
    });
  };
  navigateHomePage = () => {
    this.setState({
      navigateIndex: `homepage`
    });
  };
  navigateAnswer = () => {
    this.setState({
      navigateIndex: `answer`
    });
  };
  showAdminOrStudentNavigationBar = () => {
    console.log(localStorage.getItem("authority"));
    this.setState({
      isAdminName:
        localStorage.getItem("authority") === `ROLE_ADMIN` ? `admin` : `user`
    });
  };
  navigateAdmin = () => {
    this.setState({
      navigateIndex: `admin`
    });
  };
  navigateCorrect = () => {
    this.setState({
      navigateIndex: `correct`
    });
  };
  changeNavigationBar = () => {
    if (localStorage.getItem(`token`)) {
      this.setState({
        isUserLoginStatus: true,
        navigateIndex: `personal`
      });
    } else {
      this.setState({
        isUserLoginStatus: false
      });
    }
  };
  changeNavigationBarAdmin = () => {
    this.showAdminOrStudentNavigationBar();
  };
  /** 注册成功,跳转到登录页 */
  registerSuccess = () => {
    this.setState({
      navigateIndex: `login`
    });
  };
  logOut = () => {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`cookie`);
    this.setState({
      isUserLoginStatus: false,
      navigateIndex: `homepage`,
      isAdminName: ``
    });
  };
  componentDidMount() {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("cookie")) {
      console.log("wuwu");
    }
    this.setState({
      navigateIndex:'personal'
    })
    // axios
    // .get(`/v1/user_info`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     authentication: `${localStorage.getItem("token")}`
    //   }
    // })
    // api.login(qs.stringify(loginInfo)).then(res => {
    //   console.log(res);
    // });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="navigate-wrapper">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            />
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
              onClick={this.navigateHomePage}
            >
              计算机基础知识竞赛
            </Typography>
            <Button color="inherit" onClick={this.navigateNotice}>
              比赛须知
            </Button>
            {this.state.isUserLoginStatus ? (
              <Button color="inherit" onClick={this.navigatePersonalPage}>
                个人中心
              </Button>
            ) : null}
            {typeof this.state.isAdminName === "string" ? (
              this.state.isAdminName === `admin` ? (
                <div>
                  <Button color="inherit" onClick={this.navigateCorrect}>
                    批改题目
                  </Button>
                  <Button color="inherit" onClick={this.navigateAdmin}>
                    后台管理
                  </Button>
                </div>
              ) : (
                <Button color="inherit" onClick={this.navigateAnswer}>
                  试题
                </Button>
              )
            ) : null}
            {!this.state.isUserLoginStatus ? (
              <div>
                <Button color="inherit" onClick={this.navigateLogin}>
                  登录
                </Button>
                <Button color="inherit" onClick={this.navigateRegister}>
                  注册
                </Button>
              </div>
            ) : (
              <Button color="inherit" onClick={this.logOut}>
                登出
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {this.state.navigateIndex === `homepage` ? <Homepage /> : null}
        {this.state.navigateIndex === `login` ? (
          <Login callBack={this.changeNavigationBar} />
        ) : null}
        {this.state.navigateIndex === `personal` ? (
          <Personal callBack={this.changeNavigationBarAdmin} />
        ) : null}
        {this.state.navigateIndex === `register` ? (
          <Register callBack={this.registerSuccess} />
        ) : null}
        {this.state.navigateIndex === `notice` ? <Notice /> : null}
        {this.state.navigateIndex === `answer` ? <Answer /> : null}
      </div>
    );
  }
}
Navigate.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Navigate);
