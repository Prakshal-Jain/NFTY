import React, { useState } from 'react';
import { Card, Col, Row, Form, Button, Alert } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import "./css/signup.css"

export default function Signup(props) {
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [redirect, setRedirect] = useState(null);
    const [error, setError] = useState(null);

    const handleSignup = () => {
        const credentials = {
            email,
            username,
            password,
            confirmPassword
        }
        // SEND POST REQUEST TO CREATE ACCOUNT HERE
        fetch('/api/users/signup', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.status !== 200) {
                    setError(data.message);
                }
                else {
                    setRedirect("/profile");
                }
            });
    }

    if (redirect !== null) {
        return (
            <Navigate to={redirect} />
        )

    }

    return (
        <div className="form-container">
            <Card className="login-card">
                <Row className="mb-5">
                    <Col>
                        <h3>Signup</h3>
                    </Col>
                </Row>

                <Form.Control
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-email"
                    className="w-100 mb-4"
                    onChange={(event) => setEmail(event.target.value)}
                    key="email"
                />
                <Form.Control
                    placeholder="Username"
                    aria-label="username"
                    aria-describedby="basic-username"
                    className="w-100 mb-4"
                    onChange={(event) => setUsername(event.target.value)}
                    key="username"
                />
                <Form.Control
                    placeholder="Password"
                    type="password"
                    aria-label="password"
                    aria-describedby="basic-password"
                    className="w-100 mb-4"
                    onChange={(event) => setPassword(event.target.value)}
                    key="password"
                />
                <Form.Control
                    placeholder="Confirm Password"
                    type="password"
                    aria-label="confirm password"
                    aria-describedby="basic-confirm-password"
                    className="w-100 mb-4"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    key="basic-confirm-password"
                />

                {error && (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                )}

                <Button variant="dark" onClick={handleSignup}>Signup</Button>
            </Card>
        </div>
    )
}