import React, { useState } from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import "./css/signup.css"

export default function Login(props) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleLogin = () => {
        if (email === null || password === null || email.length === 0 || password.length === 0) {
            return
        }

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

                <Button variant="dark" onClick={handleLogin}>Login</Button>
            </Card>
        </div>
    )
}