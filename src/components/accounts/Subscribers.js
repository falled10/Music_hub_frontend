import React, { Component } from "react";
import { connect } from "react-redux";
import { getSubscribers } from "../../actions/subscribers";
import { Link } from "react-router-dom";

export class Subscribers extends Component {
  state = {
    subscribers: []
  };

  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.getSubscribers(id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ subscribers: nextProps.subscribers });
  }

  render() {
    if (this.props.subscribers) {
      return (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <ul className="list-group">
                {this.state.subscribers.map(sub => (
                  <li className="list-group-item">
                    <Link to={`/user/${sub.subscriber_user.id}/`}>
                      {sub.subscriber_user.image ? (
                        <img
                          src={`http://localhost:8000${
                            sub.subscriber_user.image
                          }`}
                          alt="image"
                          className="img-fluid rounded-circle mr-3"
                          width="50"
                          height="50"
                        />
                      ) : (
                        <img
                          src="https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
                          alt="image"
                          className="img-fluid rounded-circle mr-3"
                          width="50"
                          height="50"
                        />
                      )}
                      {sub.subscriber_user.name}
                    </Link>
                  </li>
                ))}
              </ul>
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
  subscribers: state.subscribers.subscribers
});

export default connect(
  mapStateToProps,
  { getSubscribers }
)(Subscribers);
