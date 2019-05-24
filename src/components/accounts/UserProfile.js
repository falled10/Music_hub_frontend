import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser, sendRequest } from "../../actions/auth";
import { Link } from "react-router-dom";

export class UserProfile extends Component {
  state = {
    title: "",
    body: ""
  };

  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.getUser(id);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onClick = () => {
    const { title, body } = this.state;
    this.props.sendRequest(this.props.user.id, title, body);
    this.setState({
      title: "",
      body: ""
    });
  };

  render() {
    if (this.props.user) {
      const { user } = this.props;
      const { title, body } = this.state;
      return (
        <div>
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div className="frame">
                <div className="center">
                  <div className="profile">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="Profile Image"
                        className="image"
                      />
                    ) : (
                      <img
                        src="https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
                        alt="Profile Image"
                        slug
                        className="image"
                      />
                    )}

                    <div className="name">{user.name}</div>
                    <div className="job">{user.email}</div>
                    <div className="actions">
                      <Link to="/profile/update" className="btn">
                        Subscribe
                      </Link>
                      <div className="btn">Lessons</div>
                    </div>
                  </div>
                  <div className="stats">
                    <div className="box">
                      <button
                        type="button"
                        className="btn"
                        data-toggle="modal"
                        data-target="#modal"
                      >
                        <span className="value">Make</span>
                        <span className="parameter">Request</span>
                      </button>
                    </div>
                    <div className="box">
                      <span className="value">537</span>
                      <span className="parameter">Quizes</span>
                    </div>
                    <div className="box">
                      <span className="value">537</span>
                      <span className="parameter">Quizes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="modal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Make Request
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label for="recipient-name" className="col-form-label">
                        Title:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="title"
                        value={title}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label for="message-text" className="col-form-label">
                        Message:
                      </label>
                      <textarea
                        className="form-control"
                        id="message-text"
                        name="body"
                        value={body}
                        onChange={this.onChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={this.onClick}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <h2>Loading...</h2>;
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.otherUser
});

export default connect(
  mapStateToProps,
  { getUser, sendRequest }
)(UserProfile);
