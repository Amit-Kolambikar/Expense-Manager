import React from 'react';
import ExpenseInput from '../components/ExpenseInput';
import Home from '../components/Home'
var PouchDB = require('pouchdb-browser');
window.PouchDB = PouchDB;
var ExpensesDatabase = PouchDB('ExpensesDatabase');
import SelectCurrency from '../components/SelectCurrency';
var remoteCouch = false;


export default class SaveExpenseEntry extends React.Component {
  constructor(props, context) {
    super(props);
    context.router // will work
    this.formData = new Object();
    this.currentExpenseId = null;
  }
  handleForm(data) {
    data.date = data.date + ""
    this.formData = data;
    ExpensesDatabase.get('UserDetails').then(function(doc, data) {
      if (!this.formData.hasOwnProperty('currentExpenseId')) {
        this.formData.currentExpenseId = doc.currentExpenseId
        this.formData.newEntry = true;
      } else {
        this.formData.newEntry = false;
      }
    }.bind(this)).then(function(response, data) {
      // handle response
      // this.RenderApp
      // edit expense entry put
      ExpensesDatabase.get('ExpenseInput' + this.formData.currentExpenseId).then(function(doc) {
        if (!this.formData.hasOwnProperty('categoryValue')) {
          this.formData.categoryValue = doc.categoryValue;
        }
        return ExpensesDatabase.put({
          _id: doc._id,
          _rev: doc._rev,
          'date': this.formData['date'],
          'desc': this.formData['desc'],
          'categoryValue': this.formData['categoryValue'],
          'amount_value': this.formData['amount_value']
        });
      }.bind(this)).then(function(response) {
        // handle response
        // this.RenderApp
        // after edit success
        this.clearForm();
        this.showAllExpenses();
      }.bind(this)).catch(function(err) {
        if (err.status == 404) {
          // new expense entry put
          ExpensesDatabase.put({
            _id: 'ExpenseInput' + this.formData.currentExpenseId,
            'date': this.formData['date'],
            'desc': this.formData['desc'],
            'categoryValue': this.formData['categoryValue'],
            'amount_value': this.formData['amount_value']
          });
          // handle response
          // this.RenderApp
          this.formData.currentExpenseId = this.formData.currentExpenseId + 1;
          ExpensesDatabase.get('UserDetails').then(function(doc) {
            ExpensesDatabase.put({
              _id: 'UserDetails',
              _rev: doc._rev,
              currencyUnit: doc.currencyUnit,
              currentExpenseId: this.formData.currentExpenseId
            });

            this.clearForm();
            this.showAllExpenses();
          }.bind(this));

        }
      }.bind(this));
    }.bind(this));

  }
  clearForm() {
    document.getElementById('expense-form').reset();
    document.querySelectorAll('[name=date]')[0].value = "";
  }
  showAllExpenses() {
    this.formData = {};
    this.context.router.push('/app/all')
  }
  render() {
    return (<ExpenseInput
                          handleForm={ this.handleForm.bind(this) }
                          currentRouter={ this.context.router }>
            </ExpenseInput>)
  }
}
SaveExpenseEntry.contextTypes = {
  router: React.PropTypes.object.isRequired
};