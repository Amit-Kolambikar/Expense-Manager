import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
var routes = require('./config/routes');
var PouchDB = require('pouchdb-browser');
var db = new PouchDB('my_database');
var remoteCouch = false;
ReactDOM.render(
  routes,
  document.getElementById('root')
);
