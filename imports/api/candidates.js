import { Meteor } from "meteor/meteor";

import { Mongo } from "meteor/mongo";

import { check } from "meteor/check";

export const Candidates = new Mongo.Collection("candidates");

if (Meteor.isServer) {
  // This code only runs on the server

  // Only publish tasks that are public or belong to the current user

  Meteor.publish("candidates", function candidatesPublication() {
    return Candidates.find({
      $or: [{ private: { $ne: true } }, { owner: this.userId }]
    });
  });
}
Meteor.methods({
  "candidates.insert"(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task

    // if (!this.userId) {
    //   throw new Meteor.Error("not-authorized");
    // }

    Candidates.insert({
      text,
      createdAt: new Date()
    });
  },

  "candidates.remove"(candidateId) {
    check(candidateId, String);

    const candidate = Candidates.findOne(candidateId);

    if (candidate.private && candidate.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it

      throw new Meteor.Error("not-authorized");
    }

    Candidates.remove(candidateId);
  },

  "candidates.setChecked"(candidateId, setChecked) {
    check(candidateId, String);

    check(setChecked, Boolean);

    const task = Candidates.findOne(candidateId);

    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off

      throw new Meteor.Error("not-authorized");
    }

    Candidates.update(candidateId, { $set: { checked: setChecked } });
  },
  "candidates.setPrivate"(candidateId, setToPrivate) {
    check(candidateId, String);

    check(setToPrivate, Boolean);

    const task = Candidates.findOne(candidateId);

    // Make sure only the task owner can make a task private

    if (task.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Candidates.update(candidateId, { $set: { private: setToPrivate } });
  }
});
