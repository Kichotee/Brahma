import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const RequireAuth = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  return !user ? (
    <Navigate to={"login"} />
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

export default RequireAuth;
