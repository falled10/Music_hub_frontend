import React, { Component } from "react";
import axios from "axios";

export class VerifyAccount extends Component {
  state = {
    value: "You have been successfyl verify you account! You can Log in now."
  };

  componentDidMount() {
    const uuid = this.props.match.params.uuid;
    axios
      .get(`http://localhost:8000/api/verify/${uuid}/`)
      .then(res => console.log(res))
      .catch(err =>
        this.setState({ value: "User does not exist or is already verified" })
      );
  }

  render() {
    return <h2>{this.state.value}</h2>;
  }
}

export default VerifyAccount;
