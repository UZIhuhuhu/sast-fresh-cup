/*
 * @Author: WynnXin && niffler-bkkkkk 
 * @Date: 2018-10-18 13:54:33 
 * @Last Modified by: yellowDog
 * @Last Modified time: 2018-10-18 19:56:30
 */
import React, { Component } from "react";
import Navigate from "../src/components/pages/navigate";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: `#009688`
    },
    secondary: {
      main: "#f44336"
    }
  }
});
class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Navigate />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
