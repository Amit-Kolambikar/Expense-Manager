import React from 'react';
import ShowAll from '../components/ShowAll'
var PouchDB = require('pouchdb-browser');
window.PouchDB = PouchDB;
var remoteCouch = false;
var doc = new window.jsPDF();

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
      if (this.props.location.hash) {

        doc.text((result.rows.map(function(i) {
          return JSON.stringify(i.doc)
        })).toString());
        doc.save('expenses.pdf')
      }
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