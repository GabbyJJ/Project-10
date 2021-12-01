import React from "react";
import { Redirect } from "react-router-dom";

//This will sign out the user and redirect them to the home screen

const UserSignOut = ({ onSignOut }) => {
  React.useEffect(() => {
    onSignOut();
  }, [onSignOut]);
  return <Redirect to={"/"} />;
};

export default UserSignOut;
