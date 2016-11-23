var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
import Home from '../components/Home'
import App from '../components/App'
var Nav = require('../components/Nav');
var routes = (
<Router history={ hashHistory }>
  <Route
         path="/"
         component={ Home }>
    <Route
           path="/app/:currencyUnit"
           component={ App } />
  </Route>
</Router>
);

module.exports = routes;