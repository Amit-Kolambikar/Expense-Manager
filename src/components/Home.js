import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
var cssConstants = require('../config/cssConstants').cssConstants
import SelectCurrency from '../components/SelectCurrency';
import RaisedButton from 'material-ui/RaisedButton';
import atat from '../../public/img/1479958235_at-at.png'
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
// 	id:1,
// 	amount:22.22,
// 	category:'Food',
// 	date:'1994-03-17'
// }
const ButtonStyle = {
  margin: '36px auto',
  display: 'block',
  width: '17em',
  fontWeight: 'bold',
  top: 60,
  position: 'relative'
};

const atatStyle = {
  'width': '13em',
  margin: '4em auto 1em auto',
  display: 'block',
  'left': '-22px',
  position: 'relative'
}

const Home = props => {
  return (
    <MuiThemeProvider muiTheme={ muiTheme }>
      <Paper
             style={ style }
             zDepth={ 4 }
             rounded={ false }>
        <AppBar
                title="Select your Currency"
                iconClassNameRight="muidocs - icon - navigation - expand - more"
                style={ { 'textAlign': 'center' } } />
        <img
             src={ atat }
             style={ atatStyle } />
        <SelectCurrency props={ props } />
        <RaisedButton
                      backgroundColor={ Colors.blue800 }
                      label="Proceed"
                      labelColor={ Colors.white }
                      style={ ButtonStyle }
                      onClick={ props.onProceedClick } />
      </Paper>
    </MuiThemeProvider>
  )
};
export default Home;