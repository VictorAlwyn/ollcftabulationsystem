import { Meteor } from "meteor/meteor";
//collections imports
import "../imports/api/tasks.js";

import { check } from "meteor/check";

Meteor.methods({
  getList: () => {
    console.log("users", Meteor.users.find({}).fetch());
  },
  DeleteUser: id => {
    Meteor.users.remove({ _id: `${id}` });
  },
  setPassword: (newPassword, userId) => {
    check(userId, String);
    check(newPassword, String);
    console.log("userId", userId);
    Accounts.setPassword(
      userId,
      newPassword,
      {
        login: false
      },
      (res, err) => {
        console.log("res: ", res);
        console.log("err: ", err);
      }
    );
  }
});
