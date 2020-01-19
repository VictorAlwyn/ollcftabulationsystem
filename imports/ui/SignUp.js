import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { withHistory, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import styled from "styled-components";
import BaseLayout from "./layout/BaseLayout.js";
import Form from "react-jsonschema-form";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSettingsFormSchema: undefined,
      error: undefined
    };
  }

  pageSettingsFormSubmit(formData) {
    let data = formData.formData;
    console.log("formData", data);

    Meteor.call(
      "createUser",
      {
        username: data.username,
        password: data.password,
        profile: { position: "judge", gender: data.gender },
        login: false
      },
      (res, err) => {
        console.log(res, err);
      }
    );

    console.log("Meteor.userId()", Meteor.userId());
  }

  render() {
    const pageSettingsFormSchema = {
      title: "SignUp",
      type: "object",
      required: ["username", "password", "gender"],
      properties: {
        username: {
          type: "string",
          title: "Username"
        },
        password: {
          type: "string",
          title: "Password",
          minLength: 3
        },
        gender: {
          title: "Gender",
          type: "string",
          anyOf: [
            {
              type: "string",
              enum: ["Male"],
              title: "Male"
            },
            {
              type: "string",
              enum: ["Female"],
              title: "Female"
            }
          ]
        }
      }
    };

    const pageSettingsUISchema = {
      password: {
        "ui:widget": "password"
      }
    };
    return (
      <div>
        <Form
          schema={pageSettingsFormSchema}
          uiSchema={pageSettingsUISchema}
          onSubmit={this.pageSettingsFormSubmit.bind(this)}
        >
          <div>
            <button>
              <span>Submit</span>
            </button>
          </div>
        </Form>
      </div>
    );
  }
}
