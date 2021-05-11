import React, { Component, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";

const App = () => {
  // useEffect allows us to run things when the component is loaded into the DOM
  React.useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    await fetch("http://localhost:5000/api/courses", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Basic " + btoa("john@smith.com:password"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        res.json();
      })

      .then((courses) => {
        // set Data in state using React.useState()
        console.log(courses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <p> Course List Goes Here For Now </p>;
};

export default App;
