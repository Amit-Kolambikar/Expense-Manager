import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = ['INR ₹', 'USD $', 'EUR €', 'UK £', 'YEN ¥'];

const selectStyle = {
  margin: '0em auto',
  textAlign: 'left',
  position: 'absolute',
  left: 0,
  right: 0
}

class SelectCurrency extends React.Component {
  state = {
    value: items[0],
  };

  // props = this.props.props
  handleChange = (event, index, value) => {
    this.setState({
      value
    });
    this.props.props.dropdownChange(value);

  }
  componentWillMount() {
    if (this.props.CurrencyUnit) {
      this.setState({
        value: this.props.CurrencyUnit
      })
    }
    this.state.value = this.props.CurrencyUnit
  // this.refs.SelectFieldCurrency.value = this.props.CurrencyUnit
  }
  render() {
    return (
      <div>
        <SelectField
                     value={ this.state.value }
                     onChange={ this.handleChange }
                     maxHeight={ 300 }
                     style={ selectStyle }
                     {...this.props.disabled ? { disabled:
          true } : { disabled: false }}
                     ref="SelectFieldCurrency">
          <MenuItem
                    value={ items[0] }
                    primaryText={ items[0] } />
          <MenuItem
                    value={ items[1] }
                    primaryText={ items[1] } />
          <MenuItem
                    value={ items[2] }
                    primaryText={ items[2] } />
          <MenuItem
                    value={ items[3] }
                    primaryText={ items[3] } />
          <MenuItem
                    value={ items[4] }
                    primaryText={ items[4] } />
        </SelectField>
      </div>);
  }
}

export default SelectCurrency;