import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { withHistory, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import styled from "styled-components";
import Form from "react-jsonschema-form";
import BaseLayout from "./layout/BaseLayout.js";

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // console.log("props:", this.props.history);
    if (!Meteor.userId()) {
      this.props.history.push("/");
    }
  }

  pageSettingsFormSubmit() {
    // });

    Meteor.logout(err => {
      console.log("err: ", err);
      if (err) {
        console.log(err.reason);
      } else {
        // this.props.history.push("/");
        console.log("logout success");
      }
    });
  }

  render() {
    return (
      <BaseLayout>
        <button onClick={this.pageSettingsFormSubmit}>logout</button>
      </BaseLayout>
    );
  }
}
