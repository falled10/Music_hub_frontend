import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../src/style.css";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import ProfileUpdate from "./accounts/ProfileUpdate";
import Profile from "./accounts/Profile";
import UserProfile from "./accounts/UserProfile";
import VerifyAccount from "./accounts/VerifyAccount";
import PrivateRoute from "./common/PrivateRoute";

import Dashboard from "./lessons/Dashboard";
import LessonForm from "./lessons/LessonForm";
import Lesson from "./lessons/Lesson";
import LessonUpdateForm from "./lessons/LessonUpdateForm";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import "react-mde/lib/styles/css/react-mde-all.css";

const alertOptions = {
  timeout: 3000,
  position: "top center"
};

export class App extends Component {
  componentWillMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Header />
            <Alerts />
            <Switch>
              <div className="container">
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-lesson"
                  component={LessonForm}
                />
                <PrivateRoute exact path="/lesson/:slug" component={Lesson} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/user/:id" component={UserProfile} />
                <PrivateRoute
                  exact
                  path="/profile/update"
                  component={ProfileUpdate}
                />
                <PrivateRoute
                  exact
                  path="/update/:slug"
                  component={LessonUpdateForm}
                />

                <Route exact path="/login" component={Login} />
                <Route exact path="/verify/:uuid" component={VerifyAccount} />
                <Route exact path="/register" component={Register} />
              </div>
            </Switch>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
