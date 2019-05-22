import React, { Component } from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { connect } from "react-redux";
import { updateLesson, getLesson } from "../../actions/lessons";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      value: "",
      tab: "write",
      lesson: null
    };

    this.propTypes = {
      lesson: PropTypes.object.isRequired,
      user: PropTypes.object.isRequired,
      getLesson: PropTypes.func.isRequired,
      updateLesson: PropTypes.func.isRequired
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.props.getLesson(slug);
  }

  componentWillReceiveProps(nextProps) {
    const { title, body } = nextProps.lesson;
    this.setState({ title, value: body });
    this.setState({ lesson: nextProps.lesson });
  }

  onSubmit = e => {
    e.preventDefault();
    const { title, value } = this.state;
    const lesson = { title, body: value };
    this.props.updateLesson(lesson, this.state.lesson.slug);
    this.setState({
      tab: "write"
    });
  };

  handleValueChange = value => {
    this.setState({ value });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleTabChange = tab => {
    this.setState({ tab });
  };

  render() {
    if (!this.state.lesson && this.props.errors.state != 404) {
      return <h2>Loading...</h2>;
    } else if (this.props.user.id == this.state.lesson.owner) {
      return (
        <div className="container mt-5">
          <h2>Create New Lesson with markdown</h2>
          <form onSubmit={this.onSubmit} className="mt-2">
            <div className="form-group">
              <label>Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                onChange={this.onChange}
                value={this.state.title}
              />
            </div>
            <div className="form-group">
              <ReactMde
                onChange={this.handleValueChange}
                onTabChange={this.handleTabChange}
                value={this.state.value}
                generateMarkdownPreview={markdown =>
                  Promise.resolve(this.converter.makeHtml(markdown))
                }
                selectedTab={this.state.tab}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => ({
  lesson: state.lessons.lesson,
  user: state.auth.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateLesson, getLesson }
)(MarkdownEditor);
