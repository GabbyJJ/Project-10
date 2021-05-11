import React from "react";
import { Redirect } from "react-router-dom";

const PrivateRoutes = ({ children, user }) => {
  return auth.user ? (
    children
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
};
