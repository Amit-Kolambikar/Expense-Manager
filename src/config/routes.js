var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
import Home from '../components/Home'
var Nav = require('../components/Nav');
var routes = (
<Router history={ hashHistory }>
  <Route
         path="/"
         component={ Home } />
</Router>
);

module.exports = routes;