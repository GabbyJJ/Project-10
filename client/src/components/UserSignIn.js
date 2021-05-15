import React from "react";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";

const UserSignIn = () => {
  let history = useHistory();

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");

  const signIn = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("All Fields Are Required");
    }
    fetch(`http://localhost:5000/api/users`, {
      method: "GET",
      mode: "cors",

      headers: {
        Authorization: "Basic " + btoa(`${email}:${password}`),
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((userData) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.emailAddress,
            password: password,
          })
        );
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
        <div class="form--centered">
          <h2>Sign In</h2>

          <form
            onSubmit={(e) => {
              signIn(e);
            }}
          >
            <label for="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button class="button" type="submit">
              Sign In
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
          <p>
            Don't have a user account? Click here to{" "}
            <Link to="/signup">sign up</Link>!
          </p>
        </div>
      </main>
    </div>
  );
};
export default UserSignIn;
