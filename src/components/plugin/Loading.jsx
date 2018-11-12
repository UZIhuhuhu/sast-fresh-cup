import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import "../../style/index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: `#b3e5fc`
    },
    secondary: {
      main: "#ffff8d"
    }
  }
});
const styles = {
  root: {
    flexGrow: 1
  }
};

class Loading extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="loading-container">
        <div className={classes.root}>
          <LinearProgress />
          <br />
          <LinearProgress color="secondary" />
          <br />
          <MuiThemeProvider theme={theme}>
            <LinearProgress />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
