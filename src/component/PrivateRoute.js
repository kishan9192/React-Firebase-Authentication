import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// We are creating a wrapper for our current route
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    // This route will take all the rest of the props as they were normally being passed.
    // The only thing that's different is that it'll have a render function, which takes the
    // props as argument to check if there's a current user. If there is, then it renders the component
    // otherwise it redirects to the login page.
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
      >

    </Route>
  );
}
