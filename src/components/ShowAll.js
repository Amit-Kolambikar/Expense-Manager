import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as Colors from 'material-ui/styles/colors';
var PouchDB = require('pouchdb-browser');
window.PouchDB = PouchDB;
var ExpensesDatabase = PouchDB('ExpensesDatabase');
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
const TableCustomStyle = {
  marginTop: 20
}
const style = {
  margin: 12,
};
const styleb1 = {
  marginLeft: 350,
  marginTop: 15
};

// { props.ExpenseDataList.map = (object, i) => {
//       return <div>
//                <TableRow
//                          obj={ object }
//                          key={ i } />
//                <h2>{ object }{ i }</h2>
//              </div>
//     } }

export default class ShowAll extends React.Component {
  constructor(props, context) {
    super(props);
    context.router
    this.state = {
      items: [],
      ExpenseDataList: [],
      userDetails: {},
      selectedExpenseIndex: null
    }
  }
  populateTable() {
    var userDetails = this.props.ExpenseDataList.pop();
    var itemsArray = this.props.ExpenseDataList.map((item) => {
      let key = parseInt(item.id.split('')[item.id.split('').length - 1]);
      return <TableRow key={ key }>
               <TableRowColumn>
                 { userDetails.doc.currencyUnit.split(' ')[1] }
                 { item.doc.amount_value }
               </TableRowColumn>
               <TableRowColumn>
                 { item.doc.date }
               </TableRowColumn>
               <TableRowColumn>
                 { item.doc.categoryValue.split('-')[1] }
               </TableRowColumn>
               <TableRowColumn>
                 { item.doc.desc }
               </TableRowColumn>
             </TableRow>;
    });
    console.log(itemsArray);
    this.setState({
      items: itemsArray,
      ExpenseDataList: this.props.ExpenseDataList,
      userDetails: userDetails
    });
  }
  componentWillMount() {
    this.populateTable()
  }

  rowSelection(selectedIndex) {
    console.log(selectedIndex);
    if (selectedIndex.length === 1) {
      let value = selectedIndex[0] + 1;
      // horrible hack at 3 in the night fuck this material-ui
      window.selectedIndex = value;
    } else {
      window.selectedIndex = null;
    }
  }
  handleButtonClick(e, type) {
    if (window.selectedIndex) {
      this.setState({
        selectedExpenseIndex: window.selectedIndex
      });
      if (type == "delete") {
        ExpensesDatabase.get('ExpenseInput' + window.selectedIndex).then(function(doc) {
          return ExpensesDatabase.remove(doc);
        }).then(function(result) {
          return this.setState({
            selectedExpenseIndex: null
          });
        }).catch(function(err) {
          return false;
        });
      } else {
        this.context.router.ExpenseDetails = this.state.ExpenseDataList[window.selectedIndex - 1]
        this.context.router.actionType = type
        this.context.router.push({
          pathname: '/app/' + window.selectedIndex,
          state: {
            ExpenseDetails: this.state.items[window.selectedIndex - 1]
          }
        });
        return this.setState({
          selectedExpenseIndex: null
        });
      }
    }
    else return this.setState({
        selectedExpenseIndex: null
      });
  }
  render() {
    return (
      <div>
        <Table
               headerStyle={ TableCustomStyle }
               height="340px"
               onRowSelection={ this.rowSelection }>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>
                Amount
              </TableHeaderColumn>
              <TableHeaderColumn>
                Date
              </TableHeaderColumn>
              <TableHeaderColumn>
                Category
              </TableHeaderColumn>
              <TableHeaderColumn>
                Description
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={ false }>
            { this.state.items }
          </TableBody>
        </Table>
        <RaisedButton
                      label="Edit"
                      backgroundColor={ Colors.blue800 }
                      labelColor={ Colors.white }
                      style={ styleb1 }
                      onClick={ (event) => this.handleButtonClick(event, "edit") } />
        <RaisedButton
                      label="Delete"
                      backgroundColor={ Colors.red800 }
                      labelColor={ Colors.white }
                      style={ style }
                      onClick={ (event) => this.handleButtonClick(event, "delete") } />
      </div>
      );
  }
}

ShowAll.contextTypes = {
  router: React.PropTypes.object.isRequired
};