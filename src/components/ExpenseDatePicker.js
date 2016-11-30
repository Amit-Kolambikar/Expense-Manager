import React from 'react';
import DatePicker from 'material-ui/DatePicker';

/**
 * The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`.
 * You can also disable the Dialog passing `true` to the `disabled` property.
 */
class ExpenseDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    }
    if (this.props.hasOwnProperty('value')) {
      this.state.date = new Date(this.props.value)
    }
  }
  render() {
    return (<div>
              <DatePicker
                          hintText="Select Date"
                          mode="landscape"
                          autoOk={ true }
                          required
                          name="date"
                          value={ this.state.date }
                          onChange={ (e, date) => this.setState({
                                       date: new Date(date)
                                     }) } />
            </div>
      );
  }
}
export default ExpenseDatePicker;