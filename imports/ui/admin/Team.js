import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { withHistory, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
//library
import styled from "styled-components";
import Form from "react-jsonschema-form";
//layout
import BaseLayout from "./layout/BaseLayout.js";
//components
import Popup from "../component/Popup.js";
import Cards from "../component/Cards.js";
import DropDown from "../component/DropDown.js";
//collections
import { Candidates } from "../../api/candidates.js";

class AdminTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PopUp: false,
      changePassword: "test",
      value: ""
    };

    this.ShowPopup = this.ShowPopup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.SavePassword = this.SavePassword.bind(this);
  }

  ShowPopup() {
    this.setState({
      PopUp: false
    });
  }

  deleteJudge(id) {
    Meteor.call("DeleteUser", id);
  }

  ChangePassword(id, password) {
    this.setState({
      changePassword: `${id}`
    });
  }

  handleChange(event) {
    // console.log("event: ", event.target.value);
    this.setState({ value: event.target.value });
  }

  SavePassword(event) {
    event.preventDefault();

    Meteor.call("setPassword", this.state.value, this.state.changePassword);

    this.setState({
      changePassword: "test",
      value: ""
    });
  }

  renderJudge() {
    return this.props.candidates.map(data => {
      return (
        <tr className="border-b hover:bg-orange-100 bg-gray-100" key={data._id}>
          <td className="p-3 px-5">
            <h1 className="bg-transparent">{data._id}</h1>
          </td>
          <td className="p-3 px-5">
            <h1 className="bg-transparent">{data.username}</h1>
          </td>
          <td className="p-3 px-5">
            <h1 className="bg-transparent">{data.profile.gender}</h1>
          </td>
          {this.state.changePassword === data._id ? (
            <td className="p-3 px-5">
              <input
                type="password"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </td>
          ) : (
            <td></td>
          )}

          <td className="p-3 px-5 flex justify-end">
            {this.state.changePassword === data._id ? (
              <button
                type="button"
                className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                onClick={this.SavePassword}
              >
                Save Password
              </button>
            ) : (
              <button
                type="button"
                className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  this.ChangePassword(data._id);
                }}
              >
                Change Password
              </button>
            )}
            <button
              type="button"
              className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                this.deleteJudge(data._id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  Submit(formData) {
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
      (err, res) => {
        if (err) {
          alert("ERROR: ", err);
          return;
        }

        this.setState({
          PopUp: false
        });
      }
    );
  }

  render() {
    const FormSchema = {
      definitions: {
        Thing: {
          type: "object",
          properties: {
            name: {
              type: "string",
              default: "Default name"
            }
          }
        }
      },
      type: "object",
      properties: {
        listOfStrings: {
          type: "array",
          title: "A list of strings",
          items: {
            type: "string",
            default: "bazinga"
          }
        },
        defaultsAndMinItems: {
          type: "array",
          title: "List and item level defaults",
          minItems: 2,
          default: ["carp", "trout", "bream"],
          items: {
            type: "string",
            default: "unidentified"
          }
        }
      }
    };

    const UISchema = {
      listOfStrings: {
        items: {
          "ui:emptyValue": ""
        }
      }
    };

    return (
      <BaseLayout>
        {this.state.PopUp ? (
          <Popup title="Add Judge" action={this.ShowPopup}>
            <Form
              schema={FormSchema}
              uiSchema={UISchema}
              onSubmit={this.Submit.bind(this)}
            >
              <button className="border-2 border-blue-500 hover:border-red-500 p-3 min-w-full">
                Submit
              </button>
            </Form>
          </Popup>
        ) : (
          ""
        )}
        <div className="text-gray-900 bg-gray-200">
          <div className="p-4 flex justify-between">
            <h1 className="text-3xl">
              Candidates({this.props.candidatesCount})
            </h1>
            <button
              type="button"
              className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                this.setState({ PopUp: true });
              }}
            >
              Add Candidate
            </button>
          </div>
          <div className="px-3 py-4 flex justify-center">
            <Cards />
            <Cards />
            <Cards />
            <Cards />
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default withTracker(() => {
  return {
    candidates: Candidates.find({}, { sort: { createdAt: -1 } }).fetch(),
    candidatesCount: Candidates.find({}).count()
  };
})(AdminTeam);
