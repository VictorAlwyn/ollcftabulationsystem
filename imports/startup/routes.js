import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//pages
import App from "../ui/App.js";
import Login from "../ui/Login.js";
import SignUp from "../ui/SignUp.js";
//admin
import AdminDashboard from "../ui/admin/Dashboard.js";
import AdminJudge from "../ui/admin/Judge.js";
import AdminCandidate from "../ui/admin/Candidate.js";
import AdminTeam from "../ui/admin/Team.js";

//layout
import BaseLayout from "../ui/layout/BaseLayout.js";

export const renderRoutes = () => (
  <Router>
    {/* <BaseLayout> */}
    <Switch>
      <Route exact={true} path="/" component={Login} />
      <Route exact={true} path="/admin/dashboard" component={AdminDashboard} />
      <Route exact={true} path="/admin/judge" component={AdminJudge} />
      <Route exact={true} path="/admin/candidate" component={AdminCandidate} />
      <Route exact={true} path="/admin/team" component={AdminTeam} />
      <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/SignUp" component={SignUp} />
    </Switch>
    {/* </BaseLayout> */}
  </Router>
);
