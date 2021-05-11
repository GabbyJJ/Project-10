import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  // useEffect allows us to run things when the component is loaded into the DOM
  let { id } = useParams();

  React.useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    await fetch(`http://localhost:5000/api/courses/${id}`, {
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

  return <p> Course Details Goes Here For Now </p>;
};

export default CourseDetail;
