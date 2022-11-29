import React, { useState } from 'react';
import { Card, Col, Row, Form, Button, Alert } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import "./css/signup.css"

export default function Login(props) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [redirect, setRedirect] = useState(null);
    const [error, setError] = useState(null);

    const handleLogin = () => {
        const credentials = {
            email,
            password,
        }

        fetch('/api/users/login', {
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
                        <h3>Login</h3>
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
                    placeholder="Password"
                    type="password"
                    aria-label="password"
                    aria-describedby="basic-password"
                    className="w-100 mb-4"
                    onChange={(event) => setPassword(event.target.value)}
                    key="password"
                />

                {error && (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                )}

                <Button variant="dark" onClick={handleLogin}>Login</Button>
            </Card>
        </div>
    )
}