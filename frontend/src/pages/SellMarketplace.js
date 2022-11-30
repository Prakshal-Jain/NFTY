import { useState } from "react";
import { Card, Col, Row, Form, Button, Alert } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export default function (props) {

    const [item_name, setItemName] = useState(null);
    const [item_image, setItemImage] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [redirect, setRedirect] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        const item = {
            item_name,
            item_image,
            description,
            price
        }

        fetch('/api/marketplace', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then(async (res) => {
                try {
                    const data = await res.json();
                    if (res.status !== 200) {
                        setError(data.message);
                    }
                    else {
                        setRedirect("/marketplace");
                    }
                }
                catch (err) {
                    setError("An error occured.");
                }
            });
    }


    if (redirect !== null) {
        return (
            <Navigate to={redirect} />
        )
    }

    return (
        <Row>
            <Col>
                <Card className="p-3 m-5">
                    <Row className="mb-5">
                        <Col>
                            <h3 style={{ textAlign: "center" }}>Sell Items to Marketplace</h3>
                        </Col>
                    </Row>

                    <Form.Control
                        placeholder="Item name"
                        type="text"
                        aria-label="Item name"
                        aria-describedby="item-name"
                        className="w-100 mb-4"
                        onChange={(event) => setItemName(event.target.value)}
                        key="item-name"
                    />

                    <Form.Control
                        placeholder="Item Image"
                        type="file"
                        aria-label="Item Image"
                        aria-describedby="item-image"
                        className="w-100 mb-4"
                        onChange={(event) => setItemImage(event.target.value)}
                        key="item-image"
                    />

                    <Form.Control
                        placeholder="Price"
                        type="number"
                        aria-label="number"
                        aria-describedby="number"
                        className="w-100 mb-4"
                        onChange={(event) => setPrice(event.target.value)}
                        key="number"
                    />

                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Description"
                        aria-label="Description"
                        aria-describedby="textarea"
                        className="w-100 mb-4"
                        onChange={(event) => setDescription(event.target.value)}
                        key="description"
                    />


                    {error && (
                        <Alert variant="danger" className="mb-4" >
                            {error}
                        </Alert>
                    )}

                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <Button variant="dark" onClick={handleSubmit}>Sell Item to Marketplace</Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}