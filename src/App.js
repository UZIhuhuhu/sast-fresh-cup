/*
 * @Author: WynnXin && niffler-bkkkkk 
 * @Date: 2018-10-18 13:54:33 
 * @Last Modified by: yellowDog
 * @Last Modified time: 2018-11-15 19:53:33
 */
import React, { Component } from "react";
import Navigate from "../src/components/pages/navigate";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: `#26a69a`
    },
    secondary: {
      main: "#4db6ac"
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
