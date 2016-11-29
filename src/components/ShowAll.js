import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
const TableCustomStyle = {
  marginTop: 20
}
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
      items: []
    }
  }
  populateTable() {
    var userDetails = this.props.ExpenseDataList.pop();
    var itemsArray = this.props.ExpenseDataList.map((item) => {
      let key = parseInt(item.id.split('')[item.id.split('').length - 1]);
      return <TableRow key={ key }>
               <TableRowColumn>
                 { item.doc.amount_value }
               </TableRowColumn>
               <TableRowColumn>
                 { item.doc.date }
               </TableRowColumn>
               <TableRowColumn>
                 { item.doc.categoryValue }
               </TableRowColumn>
               <TableRowColumn>
                 { item.doc.desc }
               </TableRowColumn>
             </TableRow>;
    });
    console.log(itemsArray);
    this.setState({
      items: itemsArray
    });
  }
  componentWillMount() {
    this.populateTable()
  }
  onRowSelection(selectedIndex) {
    console.log(selectedIndex);
  }
  render() {
    return (
      <div>
        <Table
               headerStyle={ TableCustomStyle }
               height="340px"
               onRowSelection={ this.onRowSelection }>
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
          <TableBody>
            { this.state.items }
          </TableBody>
        </Table>
      </div>
      );
  }
}

ShowAll.contextTypes = {
  router: React.PropTypes.object.isRequired
};