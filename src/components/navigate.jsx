import React from "react";
import "../style/index.css";
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
import HomePage from "./homepage";
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
    navigateIndex: `homepage`
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
            <Button color="inherit" onClick={this.navigateNotice.bind(this)}>
              比赛须知
            </Button>
            <Button color="inherit" onClick={this.navigateLogin.bind(this)}>
              登录
            </Button>
            <Button color="inherit" onClick={this.navigateRegister.bind(this)}>
              注册
            </Button>
          </Toolbar>
        </AppBar>
        {this.state.navigateIndex === `homepage` ? <HomePage /> : null}
        {this.state.navigateIndex === `login` ? <Login /> : null}
        {this.state.navigateIndex === `register` ? <Register /> : null}
        {this.state.navigateIndex === `notice` ? <Notice /> : null}
      </div>
    );
  }
}
Navigate.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Navigate);
