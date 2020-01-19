import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { withHistory, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import styled from "styled-components";
import Form from "react-jsonschema-form";
import BaseLayout from "./layout/BaseLayout.js";
import Popup from "../component/Popup.js";

class AdminJudge extends Component {
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
    // alert(
    //   "A name was submitted: " +
    //     this.state.value +
    //     " id: " +
    //     this.state.changePassword
    // );

    // Accounts.setPassword(this.state.changePassword, this.state.value, {
    //   login: false
    // });

    console.log(
      "A name was submitted: " +
        this.state.value +
        " id: " +
        this.state.changePassword
    );

    Meteor.call("setPassword", this.state.value, this.state.changePassword);

    this.setState({
      changePassword: "test",
      value: ""
    });
    // Meteor.call(
    //   "setPassword",
    //   {
    //     userId: this.state.changePassword,
    //     newPassword: this.state.value,
    //     login: false
    //   },
    //   (err, res) => {
    //     console.log("err: ", err);
    //     console.log("res: ", res);
    //     if (err) {
    //       alert("ERROR: ", err);
    //       return;
    //     }

    //     this.setState({
    //       changePassword: "test",
    //       value: ""
    //     });
    //   }
    // );
  }

  renderJudge() {
    return this.props.judges.map(data => {
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

  addJudgeSubmit(formData) {
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
    const addJudgeFormSchema = {
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

    const addJudgeUISchema = {
      password: {
        "ui:widget": "password",
        "ui:options": {
          classNames: "border-gray-400 focus:border-blue-500"
        }
      }
    };

    return (
      <BaseLayout>
        {this.state.PopUp ? (
          <Popup title="Add Judge" action={this.ShowPopup}>
            <Form
              schema={addJudgeFormSchema}
              uiSchema={addJudgeUISchema}
              onSubmit={this.addJudgeSubmit.bind(this)}
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
            <h1 className="text-3xl">Judge({this.props.judgeCount})</h1>
            <button
              type="button"
              className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                this.setState({ PopUp: true });
              }}
            >
              Add Judge
            </button>
          </div>
          <div className="px-3 py-4 flex justify-center">
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
              <tbody>
                <tr className="border-b">
                  <th className="text-left p-3 px-5">ID</th>
                  <th className="text-left p-3 px-5">USERNAME</th>
                  <th className="text-left p-3 px-5">GENDER</th>
                  {this.state.changePassword != "test" ? (
                    <th className="text-left p-3 px-5">NEW PASSWORD</th>
                  ) : (
                    <th></th>
                  )}
                  <th></th>
                </tr>
                {this.renderJudge()}
              </tbody>
            </table>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default withTracker(() => {
  return {
    judges: Meteor.users.find({}, { sort: { createdAt: -1 } }).fetch(),
    judgeCount: Meteor.users.find({}).count()
  };
})(AdminJudge);
