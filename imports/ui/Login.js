import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { withHistory, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import styled from "styled-components";
import BaseLayout from "./layout/BaseLayout.js";
import Form from "react-jsonschema-form";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSettingsFormSchema: undefined
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillMount() {
    console.log("componentWillMount");
    if (Meteor.userId()) {
      this.props.history.push("/admin/dashboard");
    }
  }

  pageSettingsFormSubmit(formData) {
    let data = formData.formData;
    console.log("formData", data);
    console.log("Meteor.userId():", Meteor.user());

    Meteor.loginWithPassword(data.username, data.password, err => {
      if (err) {
        this.setState({
          error: err.reason
        });
      } else {
        this.props.history.push("/admin/dashboard");
        // console.log("login success: ", Meteor.userId());
      }
    });
  }

  render() {
    const pageSettingsFormSchema = {
      title: "Login",
      type: "object",
      required: ["username", "password"],
      properties: {
        username: {
          type: "string",
          title: "Username"
        },
        password: {
          type: "string",
          title: "Password",
          minLength: 3
        }
      }
    };

    const pageSettingsUISchema = {
      password: {
        "ui:widget": "password",
        "ui:options": {
          classNames: "border-gray-400 focus:border-blue-500"
        }
      }
    };
    return (
      <div>
        <Form
          schema={pageSettingsFormSchema}
          uiSchema={pageSettingsUISchema}
          onSubmit={this.pageSettingsFormSubmit.bind(this)}
        >
          <button className="border-2 border-blue-500 hover:border-red-500 ...">
            Login
          </button>
        </Form>
      </div>
    );
  }
}
