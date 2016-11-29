import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ShowAll from '../components/ShowAll'
import * as Colors from 'material-ui/styles/colors';
var PouchDB = require('pouchdb-browser');
window.PouchDB = PouchDB;
var remoteCouch = false;

const style = {
  margin: 12,
};
const styleb1 = {
  marginLeft: 350,
  marginTop: 15
};

export default class AllExpenses extends React.Component {

  constructor(props, context) {
    super(props);
    context.router
    this.state = {
      ExpenseDataList: null
    };
  }
  fetchExpensesList() {
    var res;
    PouchDB('ExpensesDatabase').allDocs({
      include_docs: true,
      attachments: true
    }).then(function(result) {
      this.setState({
        ExpenseDataList: result.rows
      });
    }.bind(this)).catch(function(err) {
      console.log(err);
    });
  }
  componentWillMount() {
    this.fetchExpensesList()
  }
  render() {
    if (this.state.ExpenseDataList) {
      return (
        <div>
          <ShowAll ExpenseDataList={ this.state.ExpenseDataList } />
          <RaisedButton
                        label="Edit"
                        backgroundColor={ Colors.blue800 }
                        labelColor={ Colors.white }
                        style={ styleb1 } />
          <RaisedButton
                        label="Delete"
                        backgroundColor={ Colors.red800 }
                        labelColor={ Colors.white }
                        style={ style } />
        </div>
        );
    } else {
      return (<div></div>)
    }
  }
}
AllExpenses.contextTypes = {
  router: React.PropTypes.object.isRequired
};