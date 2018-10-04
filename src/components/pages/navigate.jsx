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
import "../../config";
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
    isUserLoginStatus: false
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
  changeNavigationBar = () => {
    if (global.constants.token !== ``) {
      this.setState({
        isUserLoginStatus: true
      });
    } else {
      this.setState({
        isUserLoginStatus: false
      });
    }
  };
  /** 注册成功,跳转到登录页 */
  registerSuccess = () => {
    this.setState({
      navigateIndex: `login`
    });
  };
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
            <Button color="inherit" onClick={this.navigateLogin}>
              登录
            </Button>
            <Button color="inherit" onClick={this.navigateRegister}>
              注册
            </Button>
          </Toolbar>
        </AppBar>
        {this.state.navigateIndex === `homepage` ? <Homepage /> : null}
        {this.state.navigateIndex === `login` ? (
          <Login callBack={this.changeNavigationBar} />
        ) : null}

        {this.state.navigateIndex === `personal` ? <Personal /> : null}
        {this.state.navigateIndex === `register` ? (
          <Register callBack={this.registerSuccess} />
        ) : null}
        {this.state.navigateIndex === `notice` ? <Notice /> : null}
      </div>
    );
  }
}
Navigate.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Navigate);
