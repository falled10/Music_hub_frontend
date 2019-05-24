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
      if (error.msg.title) {
        alert.error(`Title ${error.msg.title.join()}`);
      }
      if (error.msg.body) {
        alert.error(`Body ${error.msg.body.join()}`);
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
      if (message.createLesson) {
        alert.success(message.createLesson);
      }
      if (message.updateLesson) {
        alert.success(message.updateLesson);
      }
      if (message.deleteLesson) {
        alert.success(message.deleteLesson);
      }
      if (message.updateProfile) {
        alert.success(message.updateProfile);
      }
      if (message.requestCreated) {
        alert.success(message.requestCreated);
      }
      if (message.passwordsNotMatch) {
        alert.error(message.passwordsNotMatch);
      }
      if (message.verifyAccount) {
        alert.success(message.verifyAccount);
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
