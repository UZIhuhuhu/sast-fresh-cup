import React from "react";
import classNames from "classnames";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Alert from "../plugin/alert";
import api from "../../api/index.js";
import "../../style/admin.css";

const styles = theme => ({
  container: {
    display: "block",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350
  },
  input: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  dense: {
    marginTop: 19
  }
});

class Admin extends React.Component {
  state = {
    departmentRange: ["软件研发中心", "电子部", "办公部门"],
    registerExcelName: "未选择任何文件",
    questionExcelName: "未选择任何文件",
    registerExcel: "",
    questionExcel: "",
    choiceIndex: [1, 2, 3],
    department: "",
    question: "",
    choices: [],
    alertStatus: false,
    alertText: ""
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  choiceInput = index => event => {
    let choices = this.state.choices;
    choices[index - 1] = event.target.value;
    this.setState({ choices: choices });
  };
  downloadRegisterExcelRequest = () => {
    api.downloadRegisterExcel();
  };
  downloadQuestionExcelRequest = () => {
    api.downloadQuestionExcel();
  };
  uploadResgisterExcelRequest = () => {
    let file = new FormData();
    file.append("file", this.state.registerExcel);
    api.uploadResgisterExcel(file).then(res => {
      if (res.status === 200) {
        this.setState({
          alertStatus: true,
          alertText: "上传成功"
        });
      } else {
        this.setState({
          alertStatus: true,
          alertText: "上传失败"
        });
      }
    });
  };
  uploadQuestionExcelRequest = () => {
    let file = new FormData();
    file.append("file", this.state.questionExcel);
    api.uploadQuestionExcel(file).then(res => {
      if (res.status === 200) {
        this.setState({
          alertStatus: true,
          alertText: "上传成功"
        });
      } else if (res) {
        this.setState({
          alertStatus: true,
          alertText: "上传失败"
        });
      }
    });
  };
  submitQuestionRequest = () => {
    const { department, question, choices } = this.state;
    const postData = {
      department: department,
      question: question,
      choices: choices
    };
    if (department && question) {
      api.submitQuestion(postData).then(res => {
        if (res.status === 200) {
          this.setState({
            alertStatus: true,
            alertText: "提交成功"
          });
        } else {
          this.setState({
            alertStatus: true,
            alertText: "提交失败"
          });
        }
      });
    } else {
      this.setState({
        alertStatus: true,
        alertText: "部门或题目信息不完整"
      });
    }
  };
  readResgisterFile = e => {
    const file = e.target.files[0];
    if (file) {
      this.setState({
        registerExcelName: file.name,
        registerExcel: file
      });
    }
  };
  readQuestionFile = e => {
    const file = e.target.files[0];
    if (file) {
      this.setState({
        questionExcelName: file.name,
        questionExcel: file
      });
    }
  };
  addChoice = () => {
    let choices = this.state.choiceIndex;
    choices.push(choices[choices.length - 1] + 1);
    this.setState({
      choiceIndex: choices
    });
  };
  toggleAlertStatus = () => {
    this.setState({
      alertStatus: false
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="admin-container">
        <Alert
          hintMessage={this.state.alertText}
          open={this.state.alertStatus}
          callBack={this.toggleAlertStatus}
        />
        <div className="container-column">
          <div className="container-content">
            <h2>批量注册</h2>
            <div className="button-container">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.downloadRegisterExcelRequest}
              >
                下载模版
              </Button>
            </div>
            <h4 className={classes.margin}>{this.state.registerExcelName}</h4>
            <div className="button-container">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                <input
                  className={classes.button}
                  type="file"
                  onChange={this.readResgisterFile}
                />
                选择文件
              </Button>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                onClick={this.uploadResgisterExcelRequest}
              >
                <CloudUploadIcon className={classes.leftIcon} />
                上传
              </Button>
            </div>
          </div>
          <div className="container-content">
            <h2>批量添加题目</h2>
            <div className="button-container">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.downloadQuestionExcelRequest}
              >
                下载模版
              </Button>
            </div>
            <h4 className={classes.margin}>{this.state.questionExcelName}</h4>
            <div className="button-container">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                <input
                  className={classes.button}
                  type="file"
                  onChange={this.readQuestionFile}
                />
                选择文件
              </Button>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                onClick={this.uploadQuestionExcelRequest}
              >
                <CloudUploadIcon className={classes.leftIcon} />
                上传
              </Button>
            </div>
          </div>
        </div>
        <div className="container-column">
          <div className="container-content">
            <h2>添加题目</h2>
            <div className="container-form">
              <form
                className={classes.container}
                noValidate
                autoComplete="off"
                ref="form"
              >
                <TextField
                  select
                  label="部门"
                  className={classNames(classes.margin, classes.textField)}
                  value={this.state.department}
                  onChange={this.handleChange("department")}
                >
                  {this.state.departmentRange.map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-textarea"
                  label="题目内容"
                  multiline
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange("question")}
                />
                {this.state.choiceIndex.map(index => (
                  <TextField
                    id="standard-dense"
                    key={index}
                    label={"选项" + index}
                    className={classNames(classes.textField, classes.dense)}
                    margin="dense"
                    onChange={this.choiceInput(index)}
                  />
                ))}
              </form>
              <div className="button-container">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.addChoice}
                >
                  添加选项
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.submitQuestionRequest}
                >
                  提交
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Admin);
