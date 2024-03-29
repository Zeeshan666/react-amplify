
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";
import Login from 'layouts/Login'


import "assets/css/material-dashboard-react.css?v=1.7.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
     <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} /> 
      <Route path="/login" component={Login}/>
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
