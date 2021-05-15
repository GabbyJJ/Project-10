import React from "react";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";

const UserSignUp = () => {
  let history = useHistory();
  let [firstName, setFirstName] = React.useState("");
  let [lastName, setLastName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");

  const signUp = async (e) => {
    e.preventDefault();
    // confirm passwords match

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return alert("All fields are required");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    // call api to create User
    fetch(`http://localhost:5000/api/users`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        password: password,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      // if succesfull persist user and push user to index page
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

      // else show error
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div id="root">
      <Header />
      <main>
        <div class="form--centered">
          <h2>Sign Up</h2>

          <form
            onSubmit={(e) => {
              signUp(e);
            }}
          >
            <label for="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              requried
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label for="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              requried
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label for="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              requried
            />
            <label for="password">Password</label>
            <input
              id="password"
              requried
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              requried
            />
            <button class="button" type="submit">
              Sign Up
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
            Already have a user account? Click here to{" "}
            <Link to="/signin">sign in</Link>!
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserSignUp;
