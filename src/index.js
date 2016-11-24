import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
require('flexboxgrid');
injectTapEventPlugin();
var routes = require('./config/routes');
ReactDOM.render(
  routes,
  document.getElementById('root')
);
