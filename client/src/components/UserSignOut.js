import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Redirect } from "react-router-dom";

//This will sign out the user and redirect them to the home screen

const UserSignOut = () => {
  let [user, setUser] = useContext(UserContext);
  React.useEffect(() => {
    if (user) {
      setUser(null);
    }
  }, [user, setUser]);
  return <Redirect to={"/"} />;
};

export default UserSignOut;
