import React from "react";
import { Meteor } from "meteor/meteor";
import styled from "styled-components";

const Cards = props => (
  <div className="bg-white px-6 py-8 rounded-lg shadow-lg text-center m-4">
    <div className="mb-3">
      <img
        className="w-auto mx-auto rounded-full"
        src="https://i.pravatar.cc/150?img=66"
        alt=""
      />
    </div>
    <h1 className="text-xl font-large text-gray-900 font-extrabold">
      Candidate #1
    </h1>
    <h2 className="text-xl font-medium text-gray-700">Pande Muliada</h2>
    <span className="text-blue-500 block mb-5">Front End Developer</span>
  </div>
);

export default Cards;
