import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var Nav = require('../components/Nav');
import ExpenseInput from '../components/ExpenseInput';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
var cssConstants = require('../config/cssConstants').cssConstants;

const muiTheme = getMuiTheme({
  fontFamily: 'Open Sans, sans-serif',
  palette: {
    primary1Color: Colors.blue500,
    primary2Color: Colors.blue700,
    primary3Color: Colors.grey400,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.blue500,
    clockCircleColor: fade(Colors.darkBlack, 0.07),
    shadowColor: Colors.fullBlack
  }
});

const style = {
  height: cssConstants.appHeight,
  width: cssConstants.appWidth,
  margin: '50px auto'
};

// Basic Json
// accounts , history, salary , monthly left,allocate-limit expenses 
// {
//  id:1,
//  amount:22.22,
//  category:'Food',
//  date:'1994-03-17'
// }
export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <h1>App</h1>
          <Paper
                 style={ style }
                 zDepth={ 4 }
                 rounded={ false }>
            <Nav/>
            <ExpenseInput />
          </Paper>
        </div>
      </MuiThemeProvider>
    )
  }
}
// module.exports = Home;