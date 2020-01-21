import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

const Content = styled.div`
  width: 99vw;
  display: flex;
`;

const LeftContent = styled.div``;

const RightContent = styled.div`
  width: 100%;
`;

export default class BaseLayout extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!Meteor.userId()) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <Content>
        <LeftContent>
          <div className="bg-white shadow w-64 my-2" style={{ height: "97vh" }}>
            <ul className="list-reset">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="block p-4 text-grey-darker font-bold border-grey-lighter hover:border-purple-light hover:bg-grey-lighter border-r-4"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/judge"
                  className="block p-4 text-grey-darker font-bold border-grey-lighter hover:border-purple-light hover:bg-grey-lighter border-r-4"
                >
                  Judge
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/candidate"
                  className="block p-4 text-grey-darker font-bold border-grey-lighter hover:border-purple-light hover:bg-grey-lighter border-r-4"
                >
                  Candidate
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/team"
                  className="block p-4 text-grey-darker font-bold border-grey-lighter hover:border-purple-light hover:bg-grey-lighter border-r-4"
                >
                  Team
                </Link>
              </li>
            </ul>
          </div>
        </LeftContent>
        <RightContent>{this.props.children}</RightContent>
      </Content>
    );
  }
}
