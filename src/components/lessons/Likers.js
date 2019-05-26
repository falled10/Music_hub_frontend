import React, { Component } from "react";
import { connect } from "react-redux";
import { getLesson } from "../../actions/lessons";
import { Link } from "react-router-dom";

export class Likers extends Component {
  state = {
    likes: []
  };

  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.props.getLesson(slug);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ likes: nextProps.lesson.likes });
  }

  render() {
    if (this.props.lesson) {
      return (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <ul className="list-group">
                {this.state.likes.map(like => (
                  <li className="list-group-item">
                    <Link to={`/user/${like.liker.id}/`}>
                      {like.liker.image ? (
                        <img
                          src={like.liker.image}
                          alt="image"
                          className="img-fluid rounded-circle mr-3"
                          width="50"
                          height="50"
                        />
                      ) : (
                        <img
                          src="https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
                          alt="image"
                          className="img-fluid rounded-circle mr-1"
                          width="50"
                          height="50"
                        />
                      )}
                      {like.liker.name}
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
  lesson: state.lessons.lesson
});

export default connect(
  mapStateToProps,
  { getLesson }
)(Likers);
