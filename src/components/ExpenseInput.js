import React from 'react'
import ExpenseDatePicker from '../components/ExpenseDatePicker'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import serializeForm from 'form-serialize'
var cssConstants = require('../config/cssConstants').cssConstants;
import * as Colors from 'material-ui/styles/colors';
import CategorySelection from '../components/categorySelection'
// import SelectCurrency from '../components/SelectCurrency'
var PouchDB = require('pouchdb-browser');
var ExpensesDatabase = PouchDB('ExpensesDatabase')
window.PouchDB = PouchDB;
const ButtonStyle = {
  marginTop: 12,
  fontWeight: 'bold'
};
const TextFieldStyle = {
  width: '235px',
  marginLeft: '11px'
};
const formStyle = {
  float: 'right',
  width: cssConstants.mainContainer(),
  margin: '0 73px 0 10px'
}
const descboxStyle = {
  width: '100%'
}
var expenseInput = React.createClass({
  getInitialState: function() {
    return {
      currencyUnit: null,
      categoryValue: null
    }
  },
  fetchCurrencyUnit: function() {
    ExpensesDatabase.get('UserDetails', function(err, doc) {
      return this.setState({
        currencyUnit: doc.currencyUnit.split(' ')[1]
      });
    }.bind(this));
  },
  componentDidMount: function() {
    this.fetchCurrencyUnit();
  },
  handleForm: function(evt) {
    evt.preventDefault();
    let formElement = document.getElementById('expense-form');
    let formData = serializeForm(formElement, {
      hash: true
    });
    this.validateForm(formData);
  },
  validateForm(formData) {
    //todo add more validations
    if (this.state.categoryValue) {
      formData.categoryValue = this.state.categoryValue
      this.props.handleForm(formData);
    }
  },
  recordSelectedValue: function(event, index, value) {
    this.state.categoryValue = value + "-" + event.target.innerHTML;
  },
  render: function() {
    return (
      <form
            id="expense-form"
            onSubmit={ this.handleForm }
            style={ formStyle }>
        <label>
          { this.state.currencyUnit }
        </label>
        <TextField
                   type="number"
                   className="expense-input "
                   floatingLabelText="Enter Amount"
                   required
                   style={ TextFieldStyle }
                   name="amount_value" />
        <ExpenseDatePicker/>
        <CategorySelection
                           recordSelectedValue={ this.recordSelectedValue }
                           name="category_value" />
        <div>
          <TextField
                     type="text"
                     floatingLabelText="Description (Optional) "
                     multiLine={ true }
                     rows={ 3 }
                     style={ descboxStyle }
                     name="desc" />
        </div>
        <br/>
        <br/>
        <RaisedButton
                      backgroundColor={ Colors.blue800 }
                      label="Save Expense"
                      labelColor={ Colors.white }
                      style={ ButtonStyle }
                      type="submit" />
      </form>)

  }
});
export default expenseInput;