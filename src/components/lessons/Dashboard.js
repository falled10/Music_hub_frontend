import React, { Component } from "react";
import { allLessons } from "../../actions/lessons";
import { getUsers } from "../../actions/auth";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

export class Dashboard extends Component {
  state = {
    lessons: [],
    users: []
  };

  static propTypes = {
    allLessons: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    lessons: PropTypes.array.isRequired
  };

  componentWillMount() {
    this.props.getUsers();
    this.props.allLessons();
  }

  componentWillReceiveProps(nextProps) {
    const { lessons, users } = nextProps;
    this.setState({ lessons, users });
  }
  render() {
    const { lessons, users } = this.state;
    if (users.length > 0) {
      return (
        <div>
          {lessons.map(lesson => (
            <div key={lesson.slug} className="card mt-3">
              <div className="card-header">
                {users.find(user => user.id === lesson.owner).email}
              </div>
              <div className="card-body">
                <h5 className="card-title">{lesson.title}</h5>
                <ReactMarkdown source={lesson.body.substring(0, 100)} />
                <Link
                  to={`/lesson/${lesson.slug}`}
                  className="btn btn-primary"
                >
                  Read more...
                </Link>
                {this.props.user.id == lesson.owner ? (
                  <Link
                    to={`/update/${lesson.slug}`}
                    className="btn btn-primary ml-2"
                  >
                    Update
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return <h2>Loading...</h2>;
    }
  }
}

const mapStateToProps = state => ({
  usersIsLoaded: state.auth.usersIsLoading,
  isAuhtenticated: state.auth.isAuhtenticated,
  user: state.auth.user,
  users: state.auth.users,
  lessons: state.lessons.lessons
});

export default connect(
  mapStateToProps,
  { allLessons, getUsers }
)(Dashboard);
