import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import api from "../../api/index";

const action = (
  <Button color="secondary" size="small">
    👈左边是公告
  </Button>
);

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit
  }
});

class SnackBar extends React.Component {
  state = {
    faq: ``,
    title: ``,
    displayStatus: false
  };
  getReleasedNotice = () => {
    api.getNoticeList().then(({ data: { status, data } }) => {
      if (status === 200) {
        this.setState({
          faq: data[data.length - 1].faq,
          title: data[data.length - 1].title,
          displayStatus: true
        });
      } else {
        this.setState({ displayStatus: false });
      }
    });
  };
  componentDidMount() {
    this.getReleasedNotice();
    setInterval(() => {
      this.getReleasedNotice();
    }, 300000);
  }
  render() {
    const { classes } = this.props;
    const { title, faq, displayStatus } = this.state;
    return (
      <div>
        {displayStatus ? (
          <SnackbarContent
            className={classes.snackbar}
            message={`${title} ${faq}`}
            action={action}
          />
        ) : null}
      </div>
    );
  }
}

SnackBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SnackBar);
