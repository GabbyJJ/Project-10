import React from "react";
import { Redirect } from "react-router-dom";

const UserSignOut = () => {
  localStorage.setItem("user", null);
  return <Redirect to={"/"} />;
};

export default UserSignOut;
