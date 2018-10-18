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
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: `#009688`
    },
    secondary: {
      main: "#f44336"
    }
  }
});
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
  showAdminOrStudentNavigationBar = () => {
    this.setState({
      isAdminName:
        localStorage.getItem("authority") === `ROLE_ADMIN` ? `admin` : `user`
    });
  };
  /** 导航页面的函数 */
  navigateToPage = index => {
    this.setState({ navigateIndex: index });
  };
  changeNavigationBar = () => {
    if (localStorage.getItem(`token`)) {
      this.setState({ isUserLoginStatus: true });
      this.navigateToPage(`personal`);
    } else {
      this.setState({ isUserLoginStatus: false });
    }
  };
  changeNavigationBarAdmin = () => {
    this.showAdminOrStudentNavigationBar();
  };
  /** 注册成功,跳转到登录页 */
  registerSuccess = () => {
    this.navigateToPage(`login`);
  };
  logOut = () => {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`cookie`);
    this.setState({
      isUserLoginStatus: false,
      isAdminName: ``
    });
    this.navigateToPage(`homepage`);
  };
  /** 获取登录状态失败 => 客官登录下~ */
  loginInfoFail = () => {
    this.navigateToPage(`login`);
  };
  componentDidMount() {
    this.changeNavigationBar();
    this.navigateToPage(`personal`);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="navigate-wrapper">
        <MuiThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar theme={theme}>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              />
              <Typography
                variant="title"
                color="inherit"
                className={classes.grow}
                onClick={() => {
                  this.navigateToPage(`homepage`);
                }}
              >
                计算机基础知识竞赛
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  this.navigateToPage(`notice`);
                }}
              >
                比赛须知
              </Button>
              {this.state.isUserLoginStatus ? (
                <Button
                  color="inherit"
                  onClick={() => {
                    this.navigateToPage(`personal`);
                  }}
                >
                  个人中心
                </Button>
              ) : null}
              {typeof this.state.isAdminName === "string" ? (
                this.state.isAdminName === `admin` ? (
                  <div>
                    <Button
                      color="inherit"
                      onClick={() => {
                        this.navigateToPage(`correct`);
                      }}
                    >
                      批改题目
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => {
                        this.navigateToPage(`admin`);
                      }}
                    >
                      后台管理
                    </Button>
                  </div>
                ) : (
                  <Button
                    color="inherit"
                    onClick={() => {
                      this.navigateToPage(`answer`);
                    }}
                  >
                    试题
                  </Button>
                )
              ) : null}
              {!this.state.isUserLoginStatus ? (
                <div>
                  <Button
                    color="inherit"
                    onClick={() => {
                      this.navigateToPage(`login`);
                    }}
                  >
                    登录
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => {
                      this.navigateToPage(`register`);
                    }}
                  >
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
        </MuiThemeProvider>
        {this.state.navigateIndex === `homepage` ? <Homepage /> : null}
        {this.state.navigateIndex === `login` ? (
          <Login callBack={this.changeNavigationBar} />
        ) : null}
        {this.state.navigateIndex === `personal` ? (
          <Personal
            callBack={this.changeNavigationBarAdmin}
            loginInfoFail={this.loginInfoFail}
          />
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
