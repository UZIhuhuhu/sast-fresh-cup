import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "../plugin/alert";
import api from "../../api/index";
import qs from "qs";
const styles = theme => ({
  container: {
    display: "block",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});
class Login extends React.Component {
  state = {
    studentId: ``,
    passWord: ``,
    perfectInfoStatus: false,
    loginErrorMessage: ``,
    loginErrorStatus: false
  };
  studentIdInput = event => {
    const { value } = event.target;
    this.setState({
      studentId: value
    });
  };
  passWordInput = event => {
    const { value } = event.target;
    this.setState({
      passWord: value
    });
  };
  perfectInfoHandle = () => {
    if (this.state.perfectInfoStatus) {
      this.setState({
        perfectInfoStatus: false
      });
    }
  };
  loginErrorHandle = () => {
    if (this.state.loginErrorStatus) {
      this.setState({
        loginErrorStatus: false
      });
    }
  };
  isUsernameAndPasswordNotEmpty = () =>
    this.state.studentId && this.state.passWord;
  loginSuccess = () => {
    this.props.callBack();
  };
  keyBoardEnter = event => {
    const e = event || window.event;
    if (e && e.keyCode === 13) {
      this.loginRequest();
    }
  };
  loginRequest = () => {
    if (!this.isUsernameAndPasswordNotEmpty()) {
      this.setState({
        perfectInfoStatus: true
      });
    } else {
      this.setState({
        perfectInfoStatus: false
      });
      const { studentId, passWord } = this.state;
      const loginInfo = { username: studentId, password: passWord };
      api.login(qs.stringify(loginInfo)).then(res => {
        const {
          data: { ...data }
        } = res;
        if (data.status === 200) {
          this.setState({
            loginErrorStatus: false
          });
          /** 储存token */
          localStorage.setItem("token", data.data.authentication);
          localStorage.setItem("cookie", data.data.authentication);
          /* 更新父组件 */
          this.loginSuccess();
        } else {
          if (data.status === 404) {
            this.setState({
              loginErrorStatus: true,
              loginErrorMessage: data.desc
            });
          }
        }
      });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="container content-container">
        {this.state.perfectInfoStatus ? (
          <Alert
            hintMessage="账号或密码未填写"
            open={this.state.perfectInfoStatus}
            callBack={this.perfectInfoHandle}
          />
        ) : null}
        {this.state.loginErrorStatus ? (
          <Alert
            hintMessage={this.state.loginErrorMessage}
            open={this.state.loginErrorStatus}
            callBack={this.loginErrorHandle}
          />
        ) : null}
        <h2 className="personal-title">登录</h2>
        <div className="form-container">
          <form className={classes.container} noValidate autoComplete="off">
            <div>
              <TextField
                id="standard-with-placeholder"
                label="学号"
                placeholder="学号"
                className={classes.textField}
                margin="normal"
                onChange={this.studentIdInput}
              />
            </div>
            <div>
              <TextField
                id="standard-password-input"
                label="密码"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                onChange={this.passWordInput}
                onKeyDown={this.keyBoardEnter}
              />
            </div>
          </form>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.loginRequest}
          >
            登录
          </Button>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
