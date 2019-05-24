import React, { Component } from "react";
import Avatar from "react-avatar-edit";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/auth";

export class ProfileUpdate extends Component {
  state = {
    preview: null,
    name: "",
    src: ""
  };

  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      preview: this.props.user.image
    });
  }

  onClose = () => {
    this.setState({ preview: null });
  };

  onCrop = preview => {
    this.setState({ preview });
  };

  onSubmit = e => {
    e.preventDefault();
    const { preview, name } = this.state;
    if (preview === null) {
      this.props.updateProfile(
        name,
        "http://localhost:8000/media/default.png",
        this.props.user.email
      );
    } else {
      this.props.updateProfile(name, preview, this.props.user.email);
    }
  };

  onImageLoad = image => {
    console.log(image);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.user) {
      const { name } = this.state;
      return (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-8">
              <Avatar
                width={390}
                height={300}
                onCrop={this.onCrop}
                onImageLoad={this.onImageLoad}
                onClose={this.onClose}
                src={this.state.src}
              />
            </div>
            <div className="col-md-4">
              {this.state.preview ? (
                <img src={this.state.preview} alt="Preview" />
              ) : (
                ""
              )}
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={this.onChange}
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
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

export default connect(
  mapStateToProps,
  { updateProfile }
)(ProfileUpdate);
