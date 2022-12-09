import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Image, Accordion, Table, Button, Form, Alert } from 'react-bootstrap';
import FlexLayout from '../components/FlexLayout';
import ChatBubble from "../components/ChatBubble";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";


export default function (props) {
    const [error, setError] = useState(null);
    const [auctionDetails, setAuctionDetails] = useState(null);
    const [bidList, setBidList] = useState(null);
    const [newPrice, setNewPrice] = useState(null);
    const [messages, setMessages] = useState(null);
    const [chatMessage, setChatMessage] = useState(null);
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
                        setMessages(data.chat);
                        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
                        
                        socket.on(`auction_list#${item_name}`, (auction_list) => {
                            if (auction_list.status === 200) {
                                setBidList(auction_list.message);
                                setError(null);
                            }
                            else {
                                setError(auction_list.message);
                            }
                        })

                        socket.on(`auction_list#${item_name}#${data?.user_email ?? ''}`, (auction_list) => {
                            if (auction_list.status === 200) {
                                setBidList(auction_list.message);
                                setError(null);
                            }
                            else {
                                setError(auction_list.message);
                            }
                        })


                        socket.on(`chat-message#${item_name}#${data?.user_email ?? ''}`, (m) => {
                            if (m.status === 200) {
                                setMessages(m.message);
                                setError(null);
                                bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
                            }
                            else {
                                setError(m.message);
                            }
                        })

                        socket.on(`chat-message#${item_name}`, (m) => {
                            if (m.status === 200) {
                                setMessages(m.message);
                                setError(null);
                                bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
                            }
                            else {
                                setError(m.message);
                            }
                        })
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
                                                <tr key={`auction_bid_${index}`}>
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
                                <Col style={{ marginTop: '1.5em', borderLeft: '0.1em solid gray' }}>
                                    <h3>Chat</h3>
                                    <FlexLayout direction="vertical" style={{ border: '0.1em solid #D3D3D3', borderRadius: 7, height: '40em', padding: '1em' }}>
                                        <div style={{ flex: 2, height: '100%', overflowY: "scroll" }}>
                                            {messages !== null && messages.map((m, x) => (
                                                <div className="my-2">
                                                    <ChatBubble>
                                                        <div className="p-1" style={{ textAlign: "left" }}>
                                                            {m.email}: {m.message}
                                                        </div>
                                                    </ChatBubble>
                                                </div>
                                            ))}
                                            <div ref={bottomRef} style={{height: '3em'}} className="w-100"></div>
                                        </div>
                                        <div style={{ borderTop: '0.1em solid #D3D3D3' }}>
                                            <Row className="mt-2">
                                                <Col className="my-2" lg={9} sm={9}>
                                                    <Form.Control
                                                        placeholder="Chat"
                                                        aria-label="chat"
                                                        aria-describedby="new-chat"
                                                        className="w-100"
                                                        key="new-chat"
                                                        onChange={(event) => setChatMessage(event.target.value)}
                                                        type="text"
                                                    />
                                                </Col>
                                                <Col className="my-2">
                                                    <Button className="w-100" variant="success" onClick={() => socket.emit('chat-message', { item_name: auctionDetails?.item_name, message: chatMessage })}>Bid</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </FlexLayout>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}