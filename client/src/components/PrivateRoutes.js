import { Route, Redirect } from "react-router-dom";
const PrivateRoutes = ({ children, user, ...otherProps }) => {
  return (
    <Route
      {...otherProps}
      render={(props) => (user !== null ? children : <Redirect to="/signin" />)}
    />
  );
};

export default PrivateRoutes;
