import React from "react";
import Header from "./Header";
import { useHistory, useParams } from "react-router-dom";

const UpdateCourse = () => {
  let { id } = useParams();
  let history = useHistory();
  let user = JSON.parse(localStorage.getItem("user"));
  let [updateCourseData, setUpdateCourseData] = React.useState("");

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

  const updateData = (e) => {
    e.preventDefault();
    if (!user) {
      return alert("You must be signed in to update a course");
    }

    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Authorization: "Basic " + btoa(`${user.email}:${user.password}`),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateCourseData),
    })
      .then(() => {
        history.push(`/courses/${id}`);
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
                  updateData(e);
                }}
              >
                <div class="main--flex">
                  <div>
                    <label for="courseTitle">Title</label>
                    <input
                      id="courseTitle"
                      name="courseTitle"
                      type="text"
                      value={updateCourseData.title}
                      onChange={(e) => {
                        setUpdateCourseData({
                          ...updateCourseData,
                          title: e.target.value,
                        });
                      }}
                    />
                    <p>
                      By {updateCourseData.User.firstName}{" "}
                      {updateCourseData.User.lastName}
                    </p>

                    <label for="courseDescription">Course Description</label>
                    <textarea
                      id="courseDescription"
                      name="courseDescription"
                      value={updateCourseData.description}
                      onChange={(e) => {
                        setUpdateCourseData({
                          ...updateCourseData,
                          description: e.target.value,
                        });
                      }}
                    ></textarea>
                  </div>
                  <div>
                    <label for="estimatedTime">Estimated Time</label>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      value={updateCourseData.estimatedTime}
                      onChange={(e) => {
                        setUpdateCourseData({
                          ...updateCourseData,
                          estimatedTime: e.target.value,
                        });
                      }}
                    />

                    <label for="materialsNeeded">Materials Needed</label>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      value={updateCourseData.materialsNeeded}
                      onChange={(e) => {
                        setUpdateCourseData({
                          ...updateCourseData,
                          materialsNeeded: e.target.value,
                        });
                      }}
                    ></textarea>
                  </div>
                </div>
                <button class="button" type="submit">
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
