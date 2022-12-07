import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Image, Accordion, Table, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";


export default function (props) {
    const [error, setError] = useState(null);
    const [auctionDetails, setAuctionDetails] = useState(null);
    const [bidList, setBidList] = useState(null);
    const [newPrice, setNewPrice] = useState(null);
    const bottomRef = useRef(null);

    const navigate = useNavigate();

    const socket = io({ transports: ['websocket'], upgrade: false });

    useEffect(() => {
        let query = new URLSearchParams(window.location.search);
        const item_name = decodeURIComponent(query.get("item_name"));

        fetch(`/api/auction/auction-data/?item_name=${item_name}`)
            .then(async (res) => {
                try {
                    const data = await res.json();
                    if (res.status === 200) {
                        setAuctionDetails(data);
                        setBidList(data.auction_detail);
                        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }
                    else if (res.status === 401) {
                        navigate('/login');
                    }
                    else {
                        setError(data.message);
                    }
                }
                catch (err) {
                    setError("An error occured.");
                }
            });

        socket.on(`auction_list#${item_name}`, (auction_list) => {
            console.log(auction_list);
            if (auction_list.status === 200) {
                setBidList(auction_list.message);
                bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
            else {
                console.log("Setting the error");
                setError(auction_list.message);
            }
        })

        // Get live auction details using websockets

        // Get static information about the item from server using fetch

        // socket on for 
        // socket emit the item name

    }, []);

    if (auctionDetails === null) {
        return error && (
            <Row>
                <Col style={{ padding: '2em' }}>
                    <Alert variant="danger">
                        {error}
                    </Alert>
                </Col>
            </Row>
        );
    }

    return (
        <Row style={{ padding: '2em', textAlign: "center", color: 'white' }}>
            <Col>
                <h3 style={{ marginBottom: '1em' }}>Live Auction</h3>
                <h5 style={{ color: 'gray', textAlign: "center", marginBottom: '1.5em' }}>Place your bid right now!</h5>

                <Row>
                    <Col>
                        <Card style={{ color: "black", padding: '1em' }}>

                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        {auctionDetails?.item_name}
                                    </Accordion.Header>

                                    <Accordion.Body>
                                        <Image src={auctionDetails?.item_image} style={{ width: '80%', borderRadius: '0.5em', objectFit: 'cover', marginTop: '1em', marginBottom: '1em' }} />

                                        <p>
                                            {auctionDetails?.description}
                                        </p>

                                        <h6 style={{ marginTop: '1em', marginBottom: '1em' }}>
                                            Owner: {auctionDetails?.owner}
                                        </h6>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            <Row>
                                <Col>
                                    <h5 style={{ marginTop: '1em', marginBottom: '1em' }}>
                                        Expires at: {auctionDetails?.expiration_time}
                                    </h5>
                                </Col>
                            </Row>

                            <Row style={{ justifyContent: "center", alignItems: "center" }}>
                                <Col style={{ marginTop: '1em', marginBottom: '1em', textAlign: "center" }}>
                                    <div>
                                        Highest Bid
                                    </div>
                                    <h5>
                                        {bidList.length > 0 ?
                                            bidList[bidList.length - 1].price ?? 'No bids yet'
                                            :
                                            'No bids yet'
                                        }
                                    </h5>
                                </Col>
                                <Col style={{ textAlign: "center" }}>
                                    <Row>
                                        <Col lg={9} sm={9}>
                                            <Form.Control
                                                placeholder="New price"
                                                aria-label="price"
                                                aria-describedby="new-price"
                                                className="w-100"
                                                key="new-price"
                                                onChange={(event) => setNewPrice(event.target.value)}
                                                type="number"
                                                className="w-100"
                                            />
                                        </Col>
                                        <Col>
                                            <Button variant="success" onClick={() => socket.emit('new-bid', { bid_price: newPrice, item_name: auctionDetails?.item_name })}>Bid</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    {error && (
                                        <Alert variant="danger">
                                            {error}
                                        </Alert>
                                    )}
                                </Col>
                            </Row>

                            <Row>
                                <Col style={{ marginTop: '1.5em', alignItems: 'center', textAlign: 'center' }}>
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Bid Price</th>
                                                <th>Bidder</th>
                                                <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ overflowY: 'scroll', maxHeight: '10em', width: '100%' }}>
                                            {bidList !== null && bidList.map((bid, index) => (
                                                <tr key={`auction_bid_${index}`} ref={(index === (bidList.length - 1)) ? bottomRef : null}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {bid.price}
                                                    </td>
                                                    <td>
                                                        {bid.bidder}
                                                    </td>
                                                    <td>
                                                        {bid.time}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}