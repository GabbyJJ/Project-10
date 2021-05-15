import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
      <Route exact path="/" component={Courses} />
      <Route exact path="/courses/:id" component={CourseDetail} />
      <Route exact path="/signin" component={UserSignIn} />
      <Route exact path="/signup" component={UserSignUp} />
      <Route exact path="/signout" component={UserSignOut} />
      <PrivateRoutes>
        <Route exact path="/courses/create" component={CreateCourse} />
        <Route exact path="/courses/:id/update" component={UpdateCourse} />
      </PrivateRoutes>
    </Router>
  );
};

export default App;
