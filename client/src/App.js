import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

//import routes

import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import PrivateRoutes from "./components/PrivateRoutes";

//Set exact paths

const App = () => {
  let [user, setUser] = React.useState(null);
  return (
    <Router>
      <Route exact path="/">
        <Courses user={user} />
      </Route>
      <Route exact path="/courses/:id">
        <CourseDetail user={user} />
      </Route>
      <PrivateRoutes exact path="/courses/create" user={user}>
        <CreateCourse user={user} />
      </PrivateRoutes>
      <PrivateRoutes exact path="/courses/:id/update" user={user}>
        <UpdateCourse user={user} />
      </PrivateRoutes>
      <Route exact path="/signup">
        <UserSignUp onSignIn={(userData) => setUser(userData)} user={user} />
      </Route>
      <Route exact path="/signout">
        <UserSignOut onSignOut={() => setUser(null)} user={user} />
      </Route>
      <Route exact path="/signin">
        <UserSignIn onSignIn={(userData) => setUser(userData)} user={user} />
      </Route>
      <Redirect from="*" to="/" />
    </Router>
  );
};

export default App;
