import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//pages
import App from "../ui/App.js";
import Login from "../ui/Login.js";

export const renderRoutes = () => (
  <Router>
    <div>
      <Route path="/login" component={Login} />
      <Route exact={true} path="/" component={App} />
    </div>
  </Router>
);
