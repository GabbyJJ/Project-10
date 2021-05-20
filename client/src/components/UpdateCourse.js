import React from "react";
import Header from "./Header";
import { Link, useHistory, useParams } from "react-router-dom";

const ReactMarkdown = require("react-markdown");
const UpdateCourse = () => {
  let { id } = useParams();
  let history = useHistory();
  let user = JSON.parse(localStorage.getItem("user"));
  let [updateCourseData, setUpdateCourseData] = React.useState("");
  let [updateCourseDescription, setUpdateCourseDescription] =
    React.useState("");
  let [updateCourseTitle, setUpdateCourseTitle] = React.useState("");
  let [updateMaterialsNeeded, setUpdateMaterialsNeeded] = React.useState("");
  let [updateEstimatedTime, setUpdateEstimatedTime] = React.useState("");
  //let [course, setCourse] = React.useState(null);

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
        setUpdateCourseData(course);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const updateData = () => {
    if (!user) {
      return alert("You must be signed in to update a course");
    }

    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Authorization: "Basic " + btoa(`${user.email}:${user.password}`),
        "Content-Type": "application/json",
      },
    })
      .then((UpdateCourse) => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <main>
        {updateCourseData && (
          <>
            <div class="wrap">
              <h2>Update Course</h2>
              <form
                onSubmit={(e) => {
                  updateCourseData(e);
                }}
              >
                <div class="main--flex">
                  <div>
                    <label for="courseTitle">{updateCourseData.title}</label>
                    <input
                      id="courseTitle"
                      name="courseTitle"
                      type="text"
                      value={updateCourseTitle}
                      onChange={(e) => {
                        setUpdateCourseTitle(e.target.value);
                      }}
                    />

                    <p>
                      By
                      {user.firstName} {user.lastName}
                    </p>

                    <ReactMarkdown
                      children={updateCourseData.updateCourseDescription}
                    />

                    <label for="courseDescription">Course Description</label>
                    <textarea
                      id="courseDescription"
                      name="courseDescription"
                      value={updateCourseDescription}
                      onChange={(e) => {
                        setUpdateCourseDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div>
                    <label for="estimatedTime">Estimated Time</label>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      value={updateEstimatedTime}
                      onChange={(e) => {
                        setUpdateEstimatedTime(e.target.value);
                      }}
                    />

                    <label for="materialsNeeded">Materials Needed</label>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      value={updateMaterialsNeeded}
                      onChange={(e) => {
                        setUpdateMaterialsNeeded(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <button
                  class="button"
                  onClick={() => {
                    updateCourseData();
                  }}
                >
                  Update Course
                </button>
                <button
                  class="button button-secondary"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default UpdateCourse;
