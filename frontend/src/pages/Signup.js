import React, { useState } from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import "./css/signup.css"

export default function Signup(props) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleSignup = () => {
        if(email === null || password === null || confirmPassword === null || email.length === 0 || password.length === 0 || confirmPassword.length === 0){
            return
        }

        const credentials = {
            email,
            password,
            confirmPassword
        }
        // SEND POST REQUEST TO CREATE ACCOUNT HERE
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

                <Button variant="dark" onClick={handleSignup}>Signup</Button>
            </Card>
        </div>
    )
}