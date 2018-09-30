import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../style/index.css";
import axios, { AxiosResponse } from "axios";
// import {requestUrl} from "../global.js";
const requestUrl = `http://47.107.68.125:8088/`;
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
    passWord: ``
  };
  studentIdInput = event => {
    this.setState({
      studentId: event.target.value
    });
  };
  passWordInput = event => {
    this.setState({
      passWord: event.target.value
    });
  };
  loginRequest = () => {
    console.log(requestUrl);
    // fetch(`${requestUrl}v1/tokens`,{})
    axios
      .post(`${requestUrl}v1/tokens`, {
        body: {
          username: this.state.studentId,
          password: this.state.passWord
        },
        // withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "http://47.107.68.125:8088"
          // "Access-Control-Allow-Headers": "Content-Type"
          // "content-type": "application/json",
          // "Access-Control-Request-Method": "*"
        }
        // mode: "no-cors"
      })
      .then(response => console.log(response));
    // .then(response => response.json())
    // .then(res => console.log(res));
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="container content-container">
        <h2>登录</h2>
        <div className="form-container">
          <form className={classes.container} noValidate autoComplete="off">
            <div>
              <TextField
                id="standard-with-placeholder"
                label="学号"
                placeholder="学号"
                className={classes.textField}
                margin="normal"
                onChange={this.studentIdInput.bind(this)}
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
                onChange={this.passWordInput.bind(this)}
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
