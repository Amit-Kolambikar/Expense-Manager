var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
import UserDetails from '../containers/UserDetails'
import App from '../components/App'
import SaveExpenseEntry from '../containers/SaveExpenseEntry'
import AllExpenses from '../containers/AllExpenses'
import Main from '../components/Main'
var Nav = require('../components/Nav');
var routes = (
<Router history={ hashHistory }>
  <Route
         path="/"
         component={ Main }>
    <IndexRoute component={ UserDetails } />
    <Route
           path="/app"
           component={ App }>
      <IndexRoute component={ AllExpenses } />
      <Route
             path="/app/all"
             component={ AllExpenses } />
      <Route
             path="/app/new"
             component={ SaveExpenseEntry } />
    </Route>
  </Route>
</Router>
);

module.exports = routes;