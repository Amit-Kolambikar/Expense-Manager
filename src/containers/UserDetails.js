import React from 'react';
import Home from '../components/Home'
var PouchDB = require('pouchdb-browser');
var ExpensesDatabase = new PouchDB('ExpensesDatabase');
import SelectCurrency from '../components/SelectCurrency';
var remoteCouch = false;

export default class UserDetails extends React.Component {
  constructor(props, context) {
    super(props);
    context.router // will work
  }
  clickHandler(e) {
    this.context.router.push('/app')
  }
  handleDropdownChange(value) {
    ExpensesDatabase.get('UserDetails').then(function(doc) {
      return ExpensesDatabase.put({
        _id: 'UserDetails',
        _rev: doc._rev,
        currencyUnit: value,
        currentExpenseId: doc.currentExpenseId
      });
    }).then(function(response) {
      // handle response
      // this.RenderApp
    }).catch(function(err) {
      console.log(err);
      if (err.status == 404) {
        ExpensesDatabase.put({
          _id: 'UserDetails',
          currencyUnit: value,
          currentExpenseId: 1
        }).then(function(response) {
          // handle response
          // this.RenderApp
        }).catch(function(err) {
          console.log(err);
        });
      }
    });
    ExpensesDatabase.get('UserDetails').then(function(doc) {
      console.log(doc);
    });
  };

  render() {
    return (<div>
              <Home
                    onProceedClick={ this.clickHandler.bind(this) }
                    dropdownChange={ this.handleDropdownChange.bind(this) }
                    initalDropdownValue='1' />
            </div>)
  }
}
UserDetails.contextTypes = {
  router: React.PropTypes.object.isRequired
};