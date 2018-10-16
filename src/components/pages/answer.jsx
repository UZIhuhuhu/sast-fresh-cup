import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import FAB from "../plugin/FAB";
import QuestionCard from "../plugin/question-card";
import axios from "axios";
import "../../style/answer.css";
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: window.innerHeight - 64,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class Answer extends React.Component {
  state = {
    open: false,
    anchor: "left",
    answerSumLength: 0,
    questionOrderArray: []
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value
    });
  };
  displayQuestion = number => {
    axios
      .get(`/v1/exam/${number}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authentication: `${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        const {
          status,
          desc,
          data: { ...data }
        } = res.data;
        console.log(desc);
        if (status === 200) {
          console.log(data);
          let questionOrderArray = [];
          for (let i = 0; i < data.questionSize; i++) {
            questionOrderArray.push(i);
          }
          this.setState({ questionOrderArray: questionOrderArray });
          this.setState({ answerSumLength: data.questionSize });
        }
      });
  };
  changeQuestionOrder = item => {
    this.displayQuestion(item);
  };
  componentDidMount() {
    axios
      .get(`/v1/exam/`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authentication: `${localStorage.getItem("token")}`
        }
      })
      .then(() => {
        this.displayQuestion(0);
      });
  }
  render() {
    const { classes } = this.props;
    const questionOrder = this.state.questionOrderArray.map(item => (
      <div>
        <Button
          className={classes.button}
          key={item.toString()}
          // eslint-disable-next-line
          className="questionOrderButton"
          onClick={this.changeQuestionOrder(item)}
        >
          第{item + 1}题
        </Button>
        <Divider />
      </div>
    ));
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              答题卡
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          {questionOrder}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>
            {/* 题目内容 */}
            <QuestionCard callBack={this.displayQuestion} />
          </Typography>
        </main>
        <FAB />
      </div>
    );
  }
}

Answer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Answer);
