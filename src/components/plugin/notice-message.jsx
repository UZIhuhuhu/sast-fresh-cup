import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import api from "../../api/index";
import "../../style/index.css";
import Button from "@material-ui/core/Button";
const styles = theme => ({
  root: {
    width: "80%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 450
  },
  button: {
    margin: theme.spacing.unit
  }
});
class NoticeMessage extends React.Component {
  state = {
    noticeList: [],
    noticeTitle: ``,
    noticeContent: ``
  };
  titleInput = event => {
    const { value } = event.target;
    this.setState({ noticeTitle: value });
  };
  contentInput = event => {
    const { value } = event.target;
    this.setState({ noticeContent: value });
  };
  isTitleAndContentNotEmpty = () =>
    this.state.noticeTitle && this.state.noticeContent;
  releaseNewNotice = () => {
    if (this.isTitleAndContentNotEmpty) {
      api
        .postNewNotice(
          JSON.stringify({
            title: this.state.noticeTitle,
            faq: this.state.noticeContent
          })
        )
        .then(({ data: { status } }) => {
          if (status === 200) {
            this.getReleasedNotice();
          };
        });
    }
  };
  deleteNotice = index => {
    api.deleteNewNotice(index).then(({ data: { status } }) => {
      if (status === 200) this.getReleasedNotice();
    });
  };
  getReleasedNotice = () => {
    api.getNoticeList().then(({ data: { status, data } }) => {
      if (status === 200) this.setState({ noticeList: data });
    });
  };
  judgeAdmin = () =>
    localStorage.getItem(`authority`) === `ROLE_ADMIN` ? true : false;
  componentDidMount() {
    this.getReleasedNotice();
  }
  render() {
    const { classes } = this.props;
    const { noticeList } = this.state;
    const noticeListWrapper = noticeList.map((item, index) => (
      <div className="notice-item" key={index}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{item.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{item.faq}</Typography>
            {this.judgeAdmin() ? (
              <DeleteIcon
                onClick={() => {
                  this.deleteNotice(item.id);
                }}
              />
            ) : null}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    ));
    const adminReleaseNotice = (
      <div className="post-notice-container">
        <h2>管理员发布通知</h2>
        <div>
          <TextField
            id="standard-with-placeholder"
            label="通知标题"
            placeholder="通知标题"
            className={classes.textField}
            margin="normal"
            onChange={this.titleInput}
          />
        </div>
        <div>
          <TextField
            id="standard-with-placeholder2"
            label="通知内容"
            placeholder="通知内容"
            className={classes.textField}
            margin="normal"
            onChange={this.contentInput}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.releaseNewNotice}
        >
          发布新的公告
        </Button>
      </div>
    );
    return (
      <div className={classes.root}>
        {noticeListWrapper}
        {this.judgeAdmin() ? adminReleaseNotice : null}
      </div>
    );
  }
}

NoticeMessage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NoticeMessage);
