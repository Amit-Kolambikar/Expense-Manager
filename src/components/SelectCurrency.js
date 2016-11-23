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
export default class DropDownMenuLongMenuExample extends Component {
  state = {
    value: 1,
  };
  handleChange = (event, index, value) => {
    this.setState({
      value
    })
  };

  render() {
    return (
      <SelectField
                   value={ this.state.value }
                   onChange={ this.handleChange }
                   maxHeight={ 300 }
                   style={ selectStyle }>
        <MenuItem
                  value={ 1 }
                  primaryText={ items[0] } />
        <MenuItem
                  value={ 2 }
                  primaryText={ items[1] } />
        <MenuItem
                  value={ 3 }
                  primaryText={ items[2] } />
        <MenuItem
                  value={ 4 }
                  primaryText={ items[3] } />
        <MenuItem
                  value={ 5 }
                  primaryText={ items[4] } />
      </SelectField>
      );
  }
}