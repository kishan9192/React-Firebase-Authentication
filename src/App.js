import React from "react";
import SignUp from "./component/signUp";
import { Container } from "react-bootstrap";
import AuthProvider from "./contexts/AuthContext";
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import PasswordReset from './component/PasswordReset';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from "./component/PrivateRoute";
import UpdateProfile from "./component/UpdateProfile";

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <Switch>
              <PrivateRoute exact path = "/" component = {Dashboard}/>
              <PrivateRoute path = "/update-profile" component = {UpdateProfile}/>
              <Route path = "/signup" component = {SignUp} />
              <Route path = "/login" component = {Login} />
              <Route path = "/password-reset" component = {PasswordReset} />
            </Switch>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
