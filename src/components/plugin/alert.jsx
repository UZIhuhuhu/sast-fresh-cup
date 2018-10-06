import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

/**
 * 提示框组件
 * 传入的值
 * hintMessage => 提示信息
 * open => 开启状态
 * callBack => 关掉这个状态的函数
 */
class Alert extends React.Component {
  closeAlertWindow = () => {
    this.props.callBack();
  };
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.closeAlertWindow}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"提示(･ェ･。):"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.hintMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeAlertWindow} color="primary" autoFocus>
              我知道啦
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Alert;
