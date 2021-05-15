import React from "react";
import Header from "./Header";
import { useHistory } from "react-router-dom";

const CreateCourse = () => {
  let history = useHistory();
  let user = JSON.parse(localStorage.getItem("user"));
  let [errors, setErrors] = React.useState(null);
  let [title, setTitle] = React.useState("");
  let [description, setDescription] = React.useState("");
  let [estimatedTime, setEstimatedTime] = React.useState("");
  let [materialsNeeded, setMaterialsNeeded] = React.useState("");

  const createCourseData = (e) => {
    e.preventDefault();
    setErrors(null);

    if (!user) {
      return "You must be signed in to create a course";
    }

    fetch(`http://localhost:5000/api/courses`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Authorization: "Basic " + btoa(`${user.email}:${user.password}`),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        title: title,
        description: description,
        estimatedTime: estimatedTime,
        materialsNeeded: materialsNeeded,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((course) => {
        history.push(`/courses/${course.id}`);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  };

  return (
    <div>
      <Header />
      <main>
        <div class="wrap">
          <h2>Create Course</h2>

          {errors && (
            <div class="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {/* map errors */}
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          )}

          <form
            onSubmit={(e) => {
              createCourseData(e);
            }}
          >
            <div class="main--flex">
              <div>
                <label for="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                <p>
                  By {user.firstName} {user.lastName}
                </p>

                <label for="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
              <div>
                <label for="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={estimatedTime}
                  onChange={(e) => {
                    setEstimatedTime(e.target.value);
                  }}
                />

                <label for="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={materialsNeeded}
                  onChange={(e) => {
                    setMaterialsNeeded(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <button class="button" type="submit">
              Create Course
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
      </main>
    </div>
  );
};

export default CreateCourse;
