import React from 'react';
import DatePicker from 'material-ui/DatePicker';

/**
 * The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`.
 * You can also disable the Dialog passing `true` to the `disabled` property.
 */
const ExpenseDatePicker = () => (
<div>
  <DatePicker
              hintText="Select Date"
              mode="landscape"
              autoOk={ true }
              required
              name="date" />
</div>
);

export default ExpenseDatePicker;