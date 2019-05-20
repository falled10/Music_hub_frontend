import React, { Component } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.email) {
        alert.error(`Email ${error.msg.email.join()}`);
      }
      if (error.msg.name) {
        alert.error(`Name ${error.msg.name.join()}`);
      }
      if (error.msg.password) {
        alert.error(`Password ${error.msg.password.join()}`);
      }
      if (
        error.msg.detail ===
        "No active account found with the given credentials"
      ) {
        alert.error(error.msg.detail);
      }
    }

    if (message !== prevProps.message) {
      if (message.passwordsNotMatch) {
        console.log("something");
        alert.error(message.passwordsNotMatch);
      }
    }
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
