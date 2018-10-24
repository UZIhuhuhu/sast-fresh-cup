import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
// import Right from "@material-ui/icons/ArrowForward";
// import Send from "@material-ui/icons/Send";

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
          variant="fab"
          color="secondary"
          aria-label="Edit"
          className={classes.button}
          onClick={this.navigateToNextQuestion}
        >
          <EditIcon />
        </Button>
      </div>
    );
  }
}

FAB.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FAB);
