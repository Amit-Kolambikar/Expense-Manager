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
export default class expenseInput extends React.Component {
  constructor(props, context) {
    super(props);
    context.router // will work
    this.state = {
      currencyUnit: null,
      categoryValue: null
    }
    if (!isNaN(parseInt(context.router.params.id))) {
      this.state.amount_value = parseInt(context.router.ExpenseDetails.doc.amount_value);
      this.state.desc = context.router.ExpenseDetails.doc.desc;
    }
  }
  fetchCurrencyUnit() {
    ExpensesDatabase.get('UserDetails', function(err, doc) {
      return this.setState({
        currencyUnit: doc.currencyUnit.split(' ')[1]
      });
    }.bind(this));
  }
  componentDidMount() {
    this.fetchCurrencyUnit();
  }
  handleForm(evt) {
    evt.preventDefault();
    let formElement = document.getElementById('expense-form');
    let formData = serializeForm(formElement, {
      hash: true
    });
    if (!isNaN(parseInt(this.context.router.params.id))) {
      formData.currentExpenseId = this.context.router.params.id
    }
    this.validateForm(formData);
  }
  validateForm(formData) {
    //todo add more validations
    if (this.state.categoryValue) {
      formData.categoryValue = this.state.categoryValue
    }
    this.props.handleForm(formData);
  }
  recordSelectedValue(event, index, value) {
    this.state.categoryValue = value + "-" + event.target.innerHTML;
  }
  render() {
    if (isNaN(parseInt(this.context.router.params.id))) {
      return (
        <form
              id="expense-form"
              onSubmit={ this.handleForm.bind(this) }
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
                             recordSelectedValue={ this.recordSelectedValue.bind(this) }
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
    } else {
      // render edit expense
      return (
        <form
              id="expense-form"
              onSubmit={ this.handleForm.bind(this) }
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
                     name="amount_value"
                     value={ this.state.amount_value }
                     onChange={ (e) => this.setState({
                                  amount_value: e.target.value
                                }) } />
          <ExpenseDatePicker value={ this.context.router.ExpenseDetails.doc.date } />
          <CategorySelection
                             recordSelectedValue={ this.recordSelectedValue.bind(this) }
                             name="category_value"
                             value={ parseInt(this.context.router.ExpenseDetails.doc.categoryValue.split('-')[0]) } />
          <div>
            <TextField
                       type="text"
                       floatingLabelText="Description (Optional) "
                       multiLine={ true }
                       rows={ 3 }
                       style={ descboxStyle }
                       name="desc"
                       value={ this.state.desc }
                       onChange={ (e) => this.setState({
                                    desc: e.target.value
                                  }) } />
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

  }
}
expenseInput.contextTypes = {
  router: React.PropTypes.object.isRequired
};