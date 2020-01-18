import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Tasks } from "../api/tasks.js";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import Task from "./Task.js";

// App component - represents the whole app

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("tasks");
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user()
  };
})(Login);
