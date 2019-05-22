import React, { Component } from "react";
import { getLesson } from "../../actions/lessons";
import ReactMarkdown from "react-markdown";
import { getUser } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Lesson extends Component {
  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.props.getLesson(slug);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) {
      this.props.getUser(nextProps.lesson.owner);
    }
  }

  static propTypes = {
    lesson: PropTypes.object.isRequired,
    otherUser: PropTypes.object.isRequired,
    getLesson: PropTypes.func.isRequired
  };

  render() {
    const { lesson, user } = this.props;
    if (user) {
      return (
        <div>
          <div key={lesson.id} className="card mt-3">
            <div className="card-header">{user.email}</div>
            <div className="card-body">
              <h5 className="card-title">{lesson.title}</h5>
              <ReactMarkdown source={lesson.body} />
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
  user: state.auth.otherUser
});

export default connect(
  mapStateToProps,
  { getLesson, getUser }
)(Lesson);
