import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Done from "@material-ui/icons/Done";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class FAB extends React.Component {
  state = {};
  navigateToNextQuestion = () => {
    this.props.callBack();
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="fab-container">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.navigateToNextQuestion}
        >
          提交本题答案
          <Done className={classes.rightIcon}>send</Done>
        </Button>
      </div>
    );
  }
}

FAB.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FAB);
