import React, { Component } from "react";
import { getLesson, likeLesson, deleteLesson } from "../../actions/lessons";
import ReactMarkdown from "react-markdown";
import { getUser } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

export class Lesson extends Component {
  state = {
    lesson: null,
    deleted: false
  };

  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.props.getLesson(slug);
  }

  onLike = (slug, id) => {
    this.props.likeLesson(slug);
    var l = this.props.lesson;
    if (l.likes.some(like => like.liker.id === this.props.activeUser.id)) {
      l.likes = l.likes.filter(
        like => like.liker.id !== this.props.activeUser.id
      );
    } else {
      l.likes.push({ liker: this.props.activeUser, lesson: id });
    }

    this.setState({ lesson: l });
  };

  onDelete = slug => {
    this.props.deleteLesson(slug);
    this.setState({ deleted: true });
  };

  componentWillReceiveProps(nextProps) {
    const { lesson } = nextProps;
    this.setState({ lesson });
  }

  static propTypes = {
    lesson: PropTypes.object.isRequired,
    otherUser: PropTypes.object.isRequired,
    getLesson: PropTypes.func.isRequired
  };

  render() {
    if (this.state.deleted && this.state.lesson === null) {
      return <Redirect to="/" />;
    }
    if (this.state.lesson !== null) {
      const { lesson } = this.state;
      console.log("here");
      console.log(this.props.lesson);
      return (
        <div>
          <div key={lesson.id} className="card mt-3">
            <div className="card-header">
              <Link to={`/user/${lesson.owner.id}/`}>
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
              {this.props.activeUser.id == lesson.owner.id ? (
                <p className="text-right">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-toggle="modal"
                    data-target="#modal"
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
              <ReactMarkdown source={lesson.body} />
              {this.props.activeUser.id == lesson.owner.id ? (
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
                  onClick={this.onLike.bind(this, lesson.slug, lesson.id)}
                >
                  {lesson.likes.some(
                    like => like.liker.id === this.props.activeUser.id
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
                    onClick={this.onDelete.bind(this, lesson.slug)}
                  >
                    Delete
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
  lesson: state.lessons.lesson,
  activeUser: state.auth.user,
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { getLesson, getUser, likeLesson, deleteLesson }
)(Lesson);
