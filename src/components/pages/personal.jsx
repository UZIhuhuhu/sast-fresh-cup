import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import api from "../../api/index";
import "../../config";
// import axios from "axios";
// const formTokenInstance = axios.create({
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//     authorization: `${global.constants.token}`
//   }
// });

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
    department: ``
  };
  modifyTelePhone(event) {
    const { value } = event.target;
    this.setState({
      telePhone: value
    });
  }
  // getInfo = () => formTokenInstance.get(`/v1/user_info`);
  handleChange = event => {
    const { value } = event.target;
    this.setState({
      department: value
    });
  };
  isTelePhoneAndDeparmentUpdated = () => {};
  modifyPersonalInformationRequest = () => {
    const { telePhone, department } = this.state;
    const postData = { phoneNumber: telePhone, targetDepartment: department };
    api
      .modifyInfo(postData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };
  componentDidMount() {
    api
      .getInfo()
      .then(res => console.log(res.data))
      // .catch(err => console.log(err));
    // this.getInfo().then(res => res.data);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="container content-container">
        <h2>个人信息</h2>
        <div className="form-container">
          <form className={classes.container} noValidate autoComplete="off">
            <div>
              <TextField
                id="standard-read-only-input"
                label="学号"
                defaultValue={global.constants.userInfo.username}
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
            // onClick={this.loginRequest}
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
