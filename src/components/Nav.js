import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ShowChart from 'material-ui/svg-icons/editor/insert-chart';
import FiberNew from 'material-ui/svg-icons/av/fiber-new'
import ViewList from 'material-ui/svg-icons/action/view-list'
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import { Router, Route, Link } from 'react-router'
var cssConstants = require('../config/cssConstants').cssConstants;
const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '17px 32px 16px 0',
    boxShadow: 'none',
    width: cssConstants.navWidth
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  }
};

const Nav = () => (
<div>
  <Paper style={ style.paper }>
    <Menu className="navmenu">
      <MenuItem
                primaryText="New Expense"
                leftIcon={ <FiberNew /> }
                containerElement={ <Link to='/app/new' /> } />
      <MenuItem
                primaryText="Show All "
                leftIcon={ <ViewList /> }
                containerElement={ <Link to='/app/all' /> } />
      <MenuItem
                primaryText="Download"
                leftIcon={ <Download /> }
                containerElement={ <Link to='/app/new' /> } />
      <MenuItem
                primaryText="View Chart"
                leftIcon={ <ShowChart /> }
                containerElement={ <Link to='/app/view-chart' /> } />
    </Menu>
  </Paper>
</div>
);

module.exports = Nav;