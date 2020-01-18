import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
//routes
import { renderRoutes } from "../imports/startup/routes.js";

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById("render-target"));
});
