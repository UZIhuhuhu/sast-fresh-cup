import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import QuestionCard from "../plugin/question-card";
import "../../style/answer.css";
import api from "../../api/index";
import debounce from "../../utils/debounce";
const drawerWidth = 240;
const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        // background: "#2979ff"
        // borderRadius: 3,
        // border: 0,
        // color: "white",
        // height: 48,
        // padding: "0 30px",
        // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
      }
    }
  },
  palette: {
    primary: {
      main: `#90caf9`
    },
    secondary: {
      main: "#bbdefb"
    }
  }
});
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
const brightFont = {
  fontWeight: 700
};

class Answer extends React.Component {
  state = {
    open: false,
    anchor: "left",
    answerSumLength: 0,
    questionOrderArray: [],
    questionInfo: {},
    questionId: 0,
    submitAnswerMessage: ``,
    choiceSolution: ``,
    answerSolution: ``
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
    api.getQuestionDetail(`/v1/exam/${number}`).then(res => {
      const {
        status,
        data: { ...data }
      } = res.data;
      if (status === 200) {
        this.setState({ questionInfo: data, questionId: number });
      }
    });
    this.checkQuestionHasAnswer(number);
  };
  async changeQuestionOrder(item) {
    await this.displayQuestion(item);
    await this.checkQuestionHasAnswer(item);
  }
  /** 检查是否作答的函数 */
  checkQuestionHasAnswer = number => {
    api.getQuestionAnswerDetail(`/v1/exam/answer/${number}`).then(res => {
      const {
        status,
        data: { answer }
      } = res.data;
      if (status === 200) {
        if (answer !== null) {
          let questionOrderArray = this.state.questionOrderArray;
          questionOrderArray[number].answerStatus = true;
          this.setState({ questionOrderArray: questionOrderArray });
          let filterAnswerChoice = answer.split(`€`)[0];
          let filterAnswer = answer.split(`€`)[1];
          this.setState({
            choiceSolution: filterAnswerChoice,
            answerSolution: filterAnswer
          });
        } else {
          this.setState({
            choiceSolution: "",
            answerSolution: ""
          });
        }
        this.setState({
          submitAnswerMessage: answer === null ? "本题作答成功" : "本题修改成功"
        });
      }
    });
  };
  async componentDidMount() {
    await api.getQuestionSession();
    await api.getQuestionDetail(`/v1/exam/0`).then(res => {
      const {
        status,
        data: { ...data }
      } = res.data;
      if (status === 200) {
        let questionOrderArray = [];
        for (let i = 0; i < data.questionSize; i++) {
          questionOrderArray[i] = {
            order: i,
            answerStatus: false
          };
        }
        this.setState({
          questionOrderArray: questionOrderArray,
          questionInfo: data,
          answerSumLength: data.questionSize,
          questionId: 0
        });
      }
    });
    await this.checkQuestionHasAnswer(0);
  }
  render() {
    const { classes } = this.props;
    const questionOrder = this.state.questionOrderArray.map(item => (
      <div key={item.order.toString()}>
        <Button
          className={classes.button}
          // eslint-disable-next-line
          className="questionOrderButton"
          onClick={debounce(() => {
            this.changeQuestionOrder(item.order);
          })}
        >
          第{item.order + 1}题 ({item.answerStatus ? "已作答" : "未回答"})
        </Button>
        <Divider />
      </div>
    ));
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <Typography color="inherit" noWrap style={brightFont}>
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
              <QuestionCard
                callBack={() => {
                  this.displayQuestion(this.state.questionId);
                }}
                questionInfo={this.state.questionInfo.question}
                questionId={this.state.questionId}
                submitAnswerMessage={this.state.submitAnswerMessage}
                answerSolution={this.state.answerSolution}
                choiceSolution={this.state.choiceSolution}
              />
            </Typography>
          </main>
        </MuiThemeProvider>
      </div>
    );
  }
}

Answer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Answer);
