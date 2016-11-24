import React from 'react';
import Home from '../components/Home'
var PouchDB = require('pouchdb-browser');
var ExpensesDatabase = new PouchDB('ExpensesDatabase');
var remoteCouch = false;
export default class UserDetails extends React.Component {
  clickHandler(e) {
    console.log(e);
    ExpensesDatabase
      .put({
        _id: 'User',
        currencyUnit: e.target.value
      }).then(function(response) {
      console.log("Success", response)
    }).then(function(err) {
      console.log("Error", err)
    })
    ExpensesDatabase
      .info()
      .then(function(info) {
        console.log(info);
      })
  }
  render() {
    return (<div>
              <Home onProceedClick={ this.clickHandler } />
            </div>)
  }
}
