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
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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
      main: `#2979ff`
    },
    secondary: {
      main: "#f44336"
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

class Answer extends React.Component {
  state = {
    open: false,
    anchor: "left",
    answerSumLength: 0,
    questionOrderArray: [],
    questionInfo: {}
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
          data: { ...data }
        } = res.data;
        if (status === 200) {
          console.log(data);
        }
      });
  };
  changeQuestionOrder = item => {
    this.displayQuestion(item);
  };
  async componentDidMount() {
    await axios.get(`/v1/exam/`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authentication: `${localStorage.getItem("token")}`
      }
    });
    await axios
      .get(`/v1/exam/0`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authentication: `${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        const {
          status,
          data: { ...data }
        } = res.data;
        if (status === 200) {
          console.log(data.question);
          let questionOrderArray = [];
          for (let i = 0; i < data.questionSize; i++) {
            questionOrderArray.push(i);
          }
          this.setState(
            {
              questionOrderArray: questionOrderArray,
              questionInfo: data,
              answerSumLength: data.questionSize
            },
            () => console.log(this.state.questionInfo)
          );
        }
      });
  }
  render() {
    const { classes } = this.props;
    const questionOrder = this.state.questionOrderArray.map(item => (
      <div key={item.toString()}>
        <Button
          className={classes.button}
          key={item.toString()}
          // eslint-disable-next-line
          className="questionOrderButton"
          onClick={() => {
            this.changeQuestionOrder(item);
          }}
        >
          第{item + 1}题
        </Button>
        <Divider />
      </div>
    ));
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <Typography color="inherit" noWrap>
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
                callBack={this.displayQuestion}
                questionInfo={this.state.questionInfo}
              />
            </Typography>
          </main>
          <FAB />
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
