import React, {useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const history = useHistory();
    // This signup function points to the signup function in the context that we've 
    // created and passed signup, and currentUser as the value to the children.
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        const promises = [];
        setLoading(true);
        setError("");
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        // When all these promises finish, our .then will run and redirect us to dashboard
        Promise.all(promises).then(() => {
            history.push("/")
        }).catch(()=> {
            setError("Failed to update account")
        }).finally( ()=> {
            setLoading(false)
        });
    }

    return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant = "danger">{ error }</Alert>}
          <Form onSubmit = {handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required defaultValue = {currentUser.email}/>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef}  placeholder = "Leave blank to keep the same"/>
            </Form.Group>

            <Form.Group id="password_confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef}  placeholder = "Leave blank to keep the same" />
            </Form.Group>

            <Button disabled = {loading} className = "w-100" type = "submit"> Update </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to = "/">Cancel</Link>  
      </div>
    </>
    );
}
