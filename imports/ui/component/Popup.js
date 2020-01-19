import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { withHistory, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import styled from "styled-components";
import Form from "react-jsonschema-form";

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
`;

const CenterDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

const Popup = props => (
  <Overlay>
    <CenterDiv>
      <div className="bg-white rounded min-w-full border shadow-lg min-h-full">
        <div className="rounded-t bg-teal-500">
          <div className="relative py-3 px-2 flex">
            <span className="font-semibold text-white md:text-base text-sm">
              {props.title}
            </span>
            <div
              className="absolute right-0 top-0 -mr-2 -mt-2 border cursor-pointer shadow-lg bg-white z-10 p-1 rounded-full p-2"
              onClick={props.action}
            >
              <img
                src="https://image.flaticon.com/icons/svg/151/151882.svg"
                className="w-2 h-2"
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-200 md:text-base text-sm border-b p-2">
          {props.children}
        </div>
        <div className="p-2 flex justify-end rounded-b">
          <button
            className="focus:outline-none py-1 px-2 md:py-2 md:px-3 w-24 bg-red-700 hover:bg-red-600 text-white rounded"
            onClick={props.action}
          >
            Cancel
          </button>
        </div>
      </div>
    </CenterDiv>
  </Overlay>
);

export default Popup;
