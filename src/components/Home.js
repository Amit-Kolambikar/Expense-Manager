import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var Nav = require('../components/Nav');
var ExpenseInput = require('../components/ExpenseInput');
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
var cssConstants = require('../config/cssConstants').cssConstants;

const muiTheme = getMuiTheme({
  fontFamily: 'Open Sans, sans-serif',
  palette: {
    primary1Color: colors.blue500,
    primary2Color: colors.blue700,
    primary3Color: colors.grey400,
    accent1Color: colors.pinkA200,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: fade(colors.darkBlack, 0.3),
    pickerHeaderColor: colors.blue500,
    clockCircleColor: fade(colors.darkBlack, 0.07),
    shadowColor: colors.fullBlack
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
// 	id:1,
// 	amount:22.22,
// 	category:'Food',
// 	date:'1994-03-17'
// }
export default class Home extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <Paper
               style={ style }
               zDepth={ 4 }
               rounded={ false }>
          <Nav/>
          <ExpenseInput />
        </Paper>
      </MuiThemeProvider>
    )
  }
}
// module.exports = Home;