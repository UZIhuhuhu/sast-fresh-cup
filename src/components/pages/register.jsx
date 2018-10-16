import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Alert from "../plugin/alert";
// import Loading from "../plugin/loading";
import api from "../../api/index";
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 350
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
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
  }
});
class Register extends React.Component {
  state = {
    department: ``,
    name: ``,
    studentId: ``,
    passWord: ``,
    passWordConfirm: ``,
    telePhone: ``,
    passwordEqualStatus: false,
    perfectInfoStatus: false,
    postWaitStatus: false,
    registerErrorStatus: false,
    registerErrorMessage: ``
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
  passWordInputConfirm = event => {
    const { value } = event.target;
    this.setState({
      passWordConfirm: value
    });
  };
  telePhoneInput = event => {
    const { value } = event.target;
    this.setState({
      telePhone: value
    });
  };
  handleChange = event => {
    const { value } = event.target;
    // this.setState({ [event.target.name]: event.target.value });
    this.setState({
      department: value
    });
  };
  perfectInfoHandle = () => {
    if (this.state.perfectInfoStatus) {
      this.setState({
        perfectInfoStatus: false
      });
    }
  };
  registerSuccessToLogin = () => {
    this.props.callBack();
  };
  passwordEqualHandle = () => {
    if (this.state.passwordEqualStatus) {
      this.setState({
        passwordEqualStatus: false
      });
    }
  };
  registerFailHandle = () => {
    if (this.state.registerErrorStatus) {
      this.setState({
        registerErrorStatus: false
      });
    }
  };
  regiserRequest = () => {
    const {
      studentId,
      passWord,
      passWordConfirm,
      telePhone,
      department
    } = this.state;
    if (
      studentId === "" ||
      passWord === "" ||
      passWordConfirm === "" ||
      telePhone === "" ||
      department === ""
    ) {
      this.setState({
        perfectInfoStatus: true
      });
    } else {
      this.setState({
        perfectInfoStatus: false
      });
      if (passWord !== passWordConfirm) {
        this.setState({
          passwordEqualStatus: true
        });
      } else {
        this.setState({
          passwordEqualStatus: false,
          postWaitStatus: true
        });
        const registerData = {
          username: studentId,
          password: passWord,
          targetDepartment: department,
          phoneNumber: telePhone
        };
        api.register(registerData).then(response => {
          this.setState({
            postWaitStatus: false
          });
          if (response.data.status === 200) {
            /* 改变父组件Navigate的状态 */
            this.registerSuccessToLogin();
            localStorage.setItem(`userInfo`,registerData);
          } else {
            this.setState({
              registerErrorStatus: true,
              registerErrorMessage: response.data.desc
            });
          }
        });
      }
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="container register-container">
        {/* <Loading /> */}
        {/* 提示 */}
        {this.state.perfectInfoStatus ? (
          <Alert
            hintMessage="信息填入不全"
            open={this.state.perfectInfoStatus}
            callBack={this.perfectInfoHandle}
          />
        ) : null}
        {this.state.passwordEqualStatus ? (
          <Alert
            hintMessage="两次输入的密码不同哦"
            open={this.state.passwordEqualStatus}
            callBack={this.passwordEqualHandle}
          />
        ) : null}
        {this.state.registerErrorStatus ? (
          <Alert
            hintMessage={this.state.registerErrorMessage}
            open={this.state.registerErrorStatus}
            callBack={this.registerFailHandle}
          />
        ) : null}
        <h2>注册</h2>
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
              label="密码(长度大于6位)"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={this.passWordInput}
            />
          </div>
          <div>
            <TextField
              id="standard-password-input2"
              label="重复密码"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={this.passWordInputConfirm}
            />
          </div>
          <div>
            <TextField
              id="standard-with-placeholder2"
              label="手机号"
              placeholder="手机号"
              className={classes.textField}
              margin="normal"
              onChange={this.telePhoneInput}
            />
          </div>
        </form>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="department-simple">部门</InputLabel>
          <Select
            value={this.state.department}
            onChange={this.handleChange}
            inputProps={{
              name: "department",
              id: "department-simple"
            }}
          >
            <MenuItem value={"软件研发中心"}>软件研发中心</MenuItem>
            <MenuItem value={"电子部"}>电子部</MenuItem>
            <MenuItem value={"办公部门"}>办公部门</MenuItem>
          </Select>
        </FormControl>
        {!this.state.postWaitStatus ? (
          <Button
            onClick={this.regiserRequest}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            注册
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            disabled
            className={classes.button}
          >
            注册中...
          </Button>
        )}
      </div>
    );
  }
}
Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
