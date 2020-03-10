import React, { Component } from "react";
import { allLessons, deleteLesson, likeLesson } from "../../actions/lessons";
import { getUsers } from "../../actions/auth";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; //for css
import { Link } from "react-router-dom";

export class Dashboard extends Component {
  state = {
    lessons: [],
    users: [],
    activePage: 1
  };

  static propTypes = {
    allLessons: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    lessons: PropTypes.array.isRequired
  };

  componentWillMount() {
    this.props.getUsers();
    this.props.allLessons(this.state.activePage);
  }

  onLikeLesson = (slug, id) => {
    this.props.likeLesson(slug);
    const les = this.props.lessons;
    if (
      les
        .find(l => l.id === id)
        .likes.some(like => like.liker.id === this.props.user.id)
    ) {
      les.find(l => l.id === id).likes = les
        .find(l => l.id === id)
        .likes.filter(like => like.liker.id !== this.props.user.id);
    } else {
      les
        .find(l => l.id === id)
        .likes.push({ lesson: id, liker: this.props.user });
    }
    this.setState({ lessons: les });
  };

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
    this.props.allLessons(this.state.activePage);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ lessons: nextProps.lessons, users: nextProps.users });
    console.log(this.state.lessons);
  }
  render() {
    const { lessons, users } = this.state;
    console.log(lessons);
    if (users.length > 0 && this.props.user) {
      return (
        <div>
          {lessons.map(lesson => (
            <div>
              <div key={lesson.slug} className="card mt-1">
                <div className="card-header">
                  <Link
                    to={
                      lesson.owner.id !== this.props.user.id
                        ? `/user/${lesson.owner.id}/`
                        : "/profile"
                    }
                  >
                    {lesson.owner.image ? (
                      <img
                        src={lesson.owner.image}
                        alt="image"
                        className="img-fluid rounded-circle mr-3"
                        width="30"
                        height="30"
                      />
                    ) : (
                      <img
                        src="https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
                        alt="image"
                        className="img-fluid rounded-circle mr-1"
                        width="30"
                        height="30"
                      />
                    )}

                    {lesson.owner.name}
                  </Link>
                  {this.props.user.id == lesson.owner.id ? (
                    <p className="text-right">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-toggle="modal"
                        data-target={`#${lesson.slug}`}
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
                  <ReactMarkdown source={lesson.body.substring(0, 300)} />
                  <Link
                    to={`/lesson/${lesson.slug}/`}
                    className="btn btn-primary"
                  >
                    Read more...
                  </Link>
                  {this.props.user.id == lesson.owner.id ? (
                    <Link
                      to={`/update/${lesson.slug}/`}
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
                      onClick={this.onLikeLesson.bind(
                        this,
                        lesson.slug,
                        lesson.id
                      )}
                    >
                      {lesson.likes.some(
                        like => like.liker.id === this.props.user.id
                      ) ? (
                        <i className="fas fa-heart fa-2x" aria-hidden="true" />
                      ) : (
                        <i className="far fa-heart fa-2x" aria-hidden="true" />
                      )}
                    </button>
                    <Link to={`/lesson/${lesson.slug}/likers/`}>
                      {lesson.likes.length}
                    </Link>
                  </p>
                </div>
              </div>
              <div
                className="modal fade"
                id={lesson.slug}
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
                      Are you sure you want to delete lesson {lesson.slug}
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
          <Pagination
            currentPage={this.state.activePage}
            totalPages={this.props.totalPages}
            changeCurrentPage={this.handlePageChange}
            theme="bottom-border"
          />
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
  lessons: state.lessons.lessons,
  totalPages: state.lessons.totalPages
});

export default connect(
  mapStateToProps,
  { allLessons, getUsers, deleteLesson, likeLesson }
)(Dashboard);
