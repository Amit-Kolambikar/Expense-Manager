import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
var PouchDB = require('pouchdb-browser');
var db = new PouchDB('my_database');
var remoteCouch = false;
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
