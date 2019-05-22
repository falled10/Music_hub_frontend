import React, { Component } from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { connect } from "react-redux";
import { createLesson } from "../../actions/lessons";
import PropTypes from "prop-types";

export class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      value: "",
      tab: "write"
    };

    this.propTypes = {
      lesson: PropTypes.object.isRequired
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const { title, value } = this.state;
    const lesson = { title, body: value };
    this.props.createLesson(lesson);
    this.setState({
      value: "",
      title: "",
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
  }
}

export default connect(
  null,
  { createLesson }
)(MarkdownEditor);
