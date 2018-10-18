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
const styles = theme => ({
  card: {
    minWidth: 275
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
  minWidth: `25rem`,
  marginBottom: `2rem`
};
class QuestionCard extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    checkedB: true,
    title: ``
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    const { classes, questionInfo } = this.props;
    console.log(questionInfo);
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            style={styles.test}
          >
            第一题
          </Typography>
          <div className="question-title">
            {questionInfo.question ? questionInfo.question.question : null}
          </div>
        </CardContent>
        <CardActions>
          <Button size="small">题目选项以及答题框:</Button>
        </CardActions>
        <div className="option-item">
          <Checkbox value="checkedC" />
          <h5>选项1</h5>
        </div>
        <div className="option-item">
          <Checkbox value="checkedC" />
          <h5>选项2</h5>
        </div>
        <div className="option-item">
          <Checkbox value="checkedC" />
          <h5>选项3</h5>
        </div>
        <TextField
          id="outlined-multiline-flexible"
          label="答题框"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange("multiline")}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          style={textarea}
        />
      </Card>
    );
  }
}

QuestionCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuestionCard);
