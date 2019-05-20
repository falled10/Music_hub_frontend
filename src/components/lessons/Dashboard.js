import React, { Component } from "react";
import { loadUser } from "../../actions/auth";
import { connect } from "react-redux";

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <h2>Dashboard!</h2>
      </div>
    );
  }
}

export default connect(
  null,
  { loadUser }
)(Dashboard);
