import React from 'react'
import ExpenseDatePicker from '../components/ExpenseDatePicker'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
var cssConstants = require('../config/cssConstants').cssConstants;
import * as Colors from 'material-ui/styles/colors';
import SelectCurrency from '../components/SelectCurrency'

var PouchDB = require('pouchdb-browser');
var ExpensesDatabase = PouchDB('ExpensesDatabase')
const ButtonStyle = {
  marginTop: 12,
  fontWeight: 'bold'
};
const TextFieldStyle = {
  width: '100%'
};
const formStyle = {
  float: 'right',
  width: cssConstants.mainContainer(),
  margin: '0 73px 0 10px'
}
var expenseInput = React.createClass({
  handleForm: function(e) {
    e.preventDefault();
    console.log(e)
  },
  getInitialState: function() {
    return {
      currencyUnit: null
    }
  },
  fetchCurrencyUnit: function() {
    ExpensesDatabase.get('UserDetails', function(err, doc) {
      return this.setState({
        currencyUnit: doc.currencyUnit
      });
    }.bind(this));
  },
  componentDidMount: function() {
    this.fetchCurrencyUnit();
  },
  render: function() {
    if (this.state.currencyUnit) {
      return (
        <div className="row">
          <form
                onSubmit={ this.handleForm }
                style={ formStyle }>
            <TextField
                       type="number"
                       className="expense-input"
                       floatingLabelText="Enter Amount"
                       required
                       style={ TextFieldStyle } />
            <ExpenseDatePicker style={ TextFieldStyle } />
            <TextField
                       type="text"
                       floatingLabelText="Description (Optional) "
                       multiLine={ true }
                       rows={ 3 }
                       style={ TextFieldStyle } />
            <br/>
            <SelectCurrency
                            disabled={ true }
                            CurrencyUnit={ this.state.currencyUnit } />
            <RaisedButton
                          backgroundColor={ Colors.blue800 }
                          label="Save Expense"
                          labelColor={ Colors.white }
                          style={ ButtonStyle } />
          </form>
        </div>)
    } else {
      return (
        <h1>Loading</h1>
      )
    }
  }
});
export default expenseInput;