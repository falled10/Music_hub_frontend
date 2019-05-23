import React, { Component } from "react";
import { allLessons, deleteLesson, likeLesson } from "../../actions/lessons";
import { getUsers } from "../../actions/auth";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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

  onLikeLesson = slug => {
    this.props.likeLesson(slug);
  };

  componentWillReceiveProps(nextProps) {
    const { lessons, users } = nextProps;
    this.setState({ lessons, users });
  }
  render() {
    const { lessons, users } = this.state;
    if (users.length > 0 && this.props.user) {
      return (
        <div>
          {lessons.map(lesson => (
            <div>
              <div key={lesson.slug} className="card mt-3">
                <div className="card-header">
                  {users.find(user => user.id === lesson.owner).email}
                  {this.props.user.id == lesson.owner ? (
                    <p className="text-right">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        X
                      </button>
                    </p>
                  ) : (
                    ""
                  )}
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
                  <p className="text-right">
                    <button
                      className="btn btn-link"
                      onClick={this.onLikeLesson.bind(this, lesson.slug)}
                    >
                      {lesson.likes.some(
                        like => like.liker === this.props.user.id
                      ) ? (
                        <i className="fas fa-heart fa-2x" aria-hidden="true" />
                      ) : (
                        <i className="far fa-heart fa-2x" aria-hidden="true" />
                      )}
                    </button>
                    {lesson.likes.length}
                  </p>
                </div>
              </div>
              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Delete Lesson
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
                      Are you sure you want to delete lesson {lesson.title}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                        onClick={this.props.deleteLesson.bind(
                          this,
                          lesson.slug
                        )}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
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
  { allLessons, getUsers, deleteLesson, likeLesson }
)(Dashboard);
