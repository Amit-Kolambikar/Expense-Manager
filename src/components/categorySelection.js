import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// var categoryListDatabase = PouchDB('categoryListDatabase')
/**
 * With the `maxHeight` property set, the Select Field will be scrollable
 * if the number of items causes the height to exceed this limit.
 */
// categoryList will be fetched from db - enhancement - todo
export default class categorySelection extends Component {
  constructor(props, context) {
    super(props);
    context.router // will work
    this.state = {
      value: null,
      categoryList: null,
      MenuItem: null
    }
    if (this.props.value) {
      this.state.value = this.props.value;
    }
  }
  fetchExpenseCategoryList() {
    // ExpensesDatabase.get('categoryListDatabase', function(err, doc) {
    //   return this.setState({
    //     categoryList: doc.currencyUnit.split(' ')[1]
    //   });
    // }.bind(this));
    return this.state.categoryList = [{
      value: 1,
      text: 'Household'
    }, {
      value: 2,
      text: 'Health'
    }, {
      value: 3,
      text: 'Food'
    }, {
      value: 4,
      text: 'Automobile/Fuel'
    }, {
      value: 5,
      text: 'Clothing'
    }, {
      value: 6,
      text: 'Electronics'
    }, {
      value: 7,
      text: 'Mobile/Internet'
    }, {
      value: 8,
      text: 'Other'
    }];

  }
  buildMenuItems() {
    this.state.MenuItems = this.state.categoryList.map(obj => {
      return (<MenuItem
                        key={ obj.value }
                        value={ obj.value }
                        primaryText={ obj.text } />)
    });
  }
  componentDidMount() {
    this.fetchExpenseCategoryList();
    this.buildMenuItems();
  }
  handleChange = (event, index, value) => {
    this.setState({
      value
    });
    this.props.recordSelectedValue(event, index, value);
  }
  render() {
    return (
      <SelectField
                   value={ this.state.value }
                   onChange={ this.handleChange }
                   maxHeight={ 200 }
                   floatingLabelText="Select Category"
                   name="category_id">
        { this.state.MenuItems }
      </SelectField>
      );
  }
}