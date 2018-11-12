import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import FAB from "../plugin/FAB";
import Alert from "../plugin/alert";
import api from "../../api/index";
import "../../style/index.css";
const ReactMarkdown = require("react-markdown/with-html");
const styles = theme => ({
  card: {
    // minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 400
  },
  test: {
    color: "red",
    fontSize: "1rem"
  }
});
const textarea = {
  minWidth: `60vw`,
  marginBottom: `2rem`
};
class QuestionCard extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.answerTextField = React.createRef();
  // }
  state = {
    checked: true,
    title: ``,
    checkedAnswer: ``,
    textAreaAnswer: null,
    errMsg: ``,
    answerStatusCode: 0,
    answerStatus: false,
    solutionChild: [],
    makeChoiceStatus: false,
    makeAnswerStatus: false,
    emptyAnswerStatus: false,
    clickedTheButton: false
  };
  questionChoiceHandle = value => {
    this.setState({ checkedAnswer: value.choice, makeChoiceStatus: true });
  };
  textAreaHandle = event => {
    const { value } = event.target;
    this.setState({ textAreaAnswer: value, makeAnswerStatus: true });
  };
  navigateToNextQuestion = index => {
    this.setState({ clickedTheButton: true });
    const answerString = {
      questionId: index,
      answer: `${
        this.state.makeChoiceStatus === true
          ? this.state.checkedAnswer
          : this.props.choiceSolution[0]
      }€${
        this.state.makeAnswerStatus === true
          ? this.state.textAreaAnswer
          : this.props.answerSolution[0]
      }`
    };
    if (this.state.textAreaAnswer !== null) {
      api.answerQuestion(JSON.stringify(answerString)).then(res => {
        const { status, desc } = res.data;
        this.setState({
          answerStatusCode: status,
          answerStatus: true
        });
        if (status !== 200) this.setState({ errMsg: desc });
        this.setState({ textAreaAnswer: null });
        this.props.callBack();
      });
    } else {
      this.setState({ emptyAnswerStatus: true });
    }
  };
  answerAlertHandle = () => {
    if (this.state.answerStatus) {
      this.setState({ answerStatus: false });
    }
  };
  emptyAnswerAlertHandle = () => {
    if (this.state.emptyAnswerStatus) {
      this.setState({ emptyAnswerStatus: false });
    }
  };
  componentDidUpdate(prevProps) {
    if (this.props.questionInfo !== prevProps.questionInfo) {
      this.setState({ textAreaAnswer: null });
    }
  }
  render() {
    const {
      classes,
      questionInfo,
      questionId,
      submitAnswerMessage,
      choiceSolution,
      answerSolution
    } = this.props;

    /**
     * choiceSolution => 选项的回答
     * answerSolution => 答题框的回答
     */
    if (questionInfo !== undefined) {
      var markdown = questionInfo.question;
      var checkboxList = questionInfo.choices.map(item => {
        return (
          <div className="option-item">
            <Checkbox
              value="checked"
              key={item.toString()}
              /** 这边很诡异..嗯,如果重构的话,就坑下一届的吧 */
              checked={
                this.state.checkedAnswer === item.choice
                  ? true
                  : !this.state.checkedAnswer && item.choice === choiceSolution
                  ? true
                  : false
              }
              onClick={() => {
                this.questionChoiceHandle(item);
              }}
            />
            <h5>{item.choice}</h5>
          </div>
        );
      });
    }
    return (
      <div>
        {this.state.emptyAnswerStatus ? (
          <Alert
            hintMessage={
              answerSolution ? "没有做任何修改哦" : "还没有回答问题哦"
            }
            open={this.state.emptyAnswerStatus}
            callBack={this.emptyAnswerAlertHandle}
          />
        ) : null}
        {this.state.answerStatus && submitAnswerMessage ? (
          <Alert
            hintMessage={
              this.state.answerStatusCode === 200
                ? submitAnswerMessage
                : this.state.errMsg
            }
            open={this.state.answerStatus}
            callBack={this.answerAlertHandle}
          />
        ) : null}
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              style={styles.test}
            >
              第{questionId + 1}题
            </Typography>
            {/* <div className="question-title">
              {questionInfo ? markdown.toHTML(questionInfo.question) : null}
            </div> */}
            {questionInfo ? (
              <ReactMarkdown source={markdown} escapeHtml={false} />
            ) : null}
          </CardContent>
          <CardActions>
            <Button size="small">题目选项以及答题框:</Button>
          </CardActions>
          {questionInfo ? checkboxList : null}

          <TextField
            id="outlined-multiline-flexible"
            label="答题框(选项的解释或者代码)"
            multiline
            rowsMax="25"
            value={
              this.state.textAreaAnswer !== null
                ? this.state.textAreaAnswer
                : answerSolution
            }
            onChange={this.textAreaHandle}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            style={textarea}
          />
        </Card>
        <FAB
          callBack={() => {
            this.navigateToNextQuestion(questionId || 0);
          }}
        />
      </div>
    );
  }
}

QuestionCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuestionCard);
