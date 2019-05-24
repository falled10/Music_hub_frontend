import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Profile extends Component {
  render() {
    if (this.props.user) {
      const { user } = this.props;
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
                        className="image"
                      />
                    )}

                    <div className="name">{user.name}</div>
                    <div className="job">{user.email}</div>
                    <div className="actions">
                      <Link to="/profile/update" className="btn">
                        Settings
                      </Link>
                      <div className="btn">My Lessons</div>
                    </div>
                  </div>
                  <div className="stats">
                    <div className="box">
                      <span className="value">537</span>
                      <span className="parameter">Quizes</span>
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
        </div>
      );
    } else {
      return <h2>Loading...</h2>;
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Profile);
