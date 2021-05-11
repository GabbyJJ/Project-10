import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import PrivateRoutes from "./components/PrivateRoutes";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Courses} />
      <Route path="/courses/:id" component={CourseDetail} />
      <Route path="/signin" component={UserSignIn} />
      <Route path="/signup" component={UserSignUp} />
      <Route path="/signout" component={UserSignOut} />
      <PrivateRoutes>
        <Route path="/courses/create" component={CreateCourse} />
        <Route path="/courses/update" component={UpdateCourse} />
      </PrivateRoutes>
    </Router>
  );
};

export default App;
