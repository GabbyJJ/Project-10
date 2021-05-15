import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import Header from "./Header";
const ReactMarkdown = require("react-markdown");
const CourseDetail = () => {
  let { id } = useParams();
  let history = useHistory();
  let user = JSON.parse(localStorage.getItem("user"));
  let [course, setCourse] = React.useState(null);

  React.useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((course) => {
        // set data in state using React.useState()
        console.log(course);
        setCourse(course);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const deleteCourse = () => {
    if (!user) {
      return alert("You must be signed in to delete a course");
    }

    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Authorization: "Basic " + btoa(`${user.email}:${user.password}`),
        "Content-Type": "application/json",
      },
    })
      .then((course) => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="root">
      <Header />
      <main>
        <div class="actions--bar">
          <div class="wrap">
            {user && (
              <>
                <Link to={`/courses/${id}/update`} class="button">
                  Update Course
                </Link>
                <button
                  class="button"
                  onClick={() => {
                    deleteCourse();
                  }}
                >
                  Delete Course
                </button>
              </>
            )}

            <Link class="button button-secondary" to={"/"}>
              Return to List
            </Link>
          </div>
        </div>

        {course && (
          <div class="wrap">
            <h2>Course Detail</h2>
            <form>
              <div class="main--flex">
                <div>
                  <h3 class="course--detail--title">Course</h3>
                  <h4 class="course--name">{course.title}</h4>
                  <p>
                    By {course.User.firstName} {course.User.lastName}
                  </p>
                  <ReactMarkdown children={course.description} />
                </div>
                <div>
                  <h3 class="course--detail--title">Estimated Time</h3>
                  <p>
                    {course.estimatedTime
                      ? course.estimatedTimed
                      : "Estimated Time Not Provided"}
                  </p>

                  <h3 class="course--detail--title">Materials Needed</h3>
                  {course.materialsNeeded ? (
                    <ul class="course--detail--list">
                      <ReactMarkdown children={course.materialsNeeded} />{" "}
                    </ul>
                  ) : (
                    "No Materials Required"
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseDetail;
