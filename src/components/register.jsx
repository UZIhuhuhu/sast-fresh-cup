import React from "react";
import "../style/index.css";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
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
    age: "",
    name: "",
    studentId: ``,
    passWord: ``,
    passWordConfirm: ``,
    telePhone: ``
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
  passWordInputConfirm = event => {
    this.setState({
      passWordConfirm: event.target.value
    });
  };
  telePhoneInput = event => {
    this.setState({
      telePhone: event.target.value
    });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="container register-container">
        <h2>注册</h2>
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
              onChange={this.passWordInputConfirm.bind(this)}
            />
          </div>
          <div>
            <TextField
              id="standard-password-input"
              label="重复密码"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={this.passWordInputConfirm.bind(this)}
            />
          </div>
          <div>
            <TextField
              id="standard-with-placeholder"
              label="手机号"
              placeholder="手机号"
              className={classes.textField}
              margin="normal"
              onChange={this.telePhoneInput.bind(this)}
            />
          </div>
        </form>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">部门</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: "age",
              id: "age-simple"
            }}
          >
            <MenuItem value={10}>软件研发中心</MenuItem>
            <MenuItem value={20}>电子部</MenuItem>
            <MenuItem value={30}>办公部门</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" className={classes.button}>
          注册
        </Button>
      </div>
    );
  }
}
Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
