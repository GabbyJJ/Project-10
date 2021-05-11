import React, { useState } from "react";

const Courses = () => {
  // useEffect allows us to run things when the component is loaded into the DOM

  React.useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    await fetch(`http://localhost:5000/api/courses`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
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
        // set data in state using React.useState()
        console.log(courses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <p> Courses Goes Here For Now </p>;
};

export default Courses;
