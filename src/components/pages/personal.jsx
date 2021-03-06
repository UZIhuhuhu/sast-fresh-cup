import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Alert from "../plugin/alert";
import api from "../../api/index";
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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 350
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});
class Personal extends React.Component {
  state = {
    telePhone: ``,
    department: ``,
    userName: ``,
    modifyPersonalInfoStatus: false,
    modifyPersonalInfoStatusCode: 0,
    errMsg: ``
  };
  modifyTelePhone = event => {
    const { value } = event.target;
    this.setState({
      telePhone: value
    });
  };
  handleChange = event => {
    const { value } = event.target;
    this.setState({
      department: value
    });
  };
  modifyPersonalInformationRequest = () => {
    const { telePhone, department } = this.state;
    const postData = { phoneNumber: telePhone, targetDepartment: department };
    api.modifyPersonalInfo(postData).then(res => {
      const { status, desc } = res.data;
      this.setState({
        modifyPersonalInfoStatusCode: status,
        modifyPersonalInfoStatus: true
      });
      if (status !== 200) this.setState({ errMsg: desc });
    });
  };
  componentDidMount() {
    api.getPersonalInfo().then(res => {
      const {
        status,
        data: { ...data }
      } = res.data;
      if (status === 200) {
        const { username, phoneNumber, targetDepartment, authority } = data;
        localStorage.setItem("department", data.targetDepartment);
        this.setState({
          userName: username,
          telePhone: phoneNumber,
          department: targetDepartment
        });
        this.judgeCommonUserOrAdmin(authority);
        this.getInforSuccess();
      } else {
        if (status === 404) {
          this.props.loginInfoFail();
        }
      }
    });
  }
  getInforSuccess = () => {
    this.props.callBack();
  };
  judgeCommonUserOrAdmin(identity) {
    localStorage.setItem("authority", identity);
  }
  modifyAlertHandle = () => {
    if (this.state.modifyPersonalInfoStatus) {
      this.setState({
        modifyPersonalInfoStatus: false
      });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="container content-container">
        {this.state.modifyPersonalInfoStatus ? (
          <Alert
            hintMessage={
              this.state.modifyPersonalInfoStatusCode === 200
                ? "修改信息成功"
                : this.state.errMsg
            }
            open={this.state.modifyPersonalInfoStatus}
            callBack={this.modifyAlertHandle}
          />
        ) : null}
        <h2 className="personal-title">个人信息</h2>
        <div className="form-container">
          <form className={classes.container} noValidate autoComplete="off">
            <div>
              <TextField
                id="standard-read-only-input"
                label="学号"
                value={this.state.userName}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div>
              <TextField
                id="standard-name"
                label="电话号码"
                className={classes.textField}
                value={this.state.telePhone}
                onChange={this.modifyTelePhone}
                margin="normal"
              />
            </div>
            <div>
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
            </div>
          </form>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.modifyPersonalInformationRequest}
          >
            修改
          </Button>
        </div>
      </div>
    );
  }
}
Personal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Personal);
