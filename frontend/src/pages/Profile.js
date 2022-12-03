import { useState } from 'react';
import "./css/profile.css";
import userProfilePhoto from '../assets/1.png';
import { Row, Col, Modal, Button, Alert, Table, Form } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";


function DividerSection(props) {
    return (
        <Row className="divider-section-container">
            <Col style={{ marginBottom: '1em' }}>
                {props.children}
            </Col>
            <div className="seperator" />
        </Row>
    )
}

function Profile(props) {
    const [modalDetails, setShowModal] = useState(null);
    const [modalError, setModalError] = useState(null);
    const [newPrice, setNewPrice] = useState(null);
    const [successResell, setSuccessResell] = useState(false);

    const navigate = useNavigate();

    const handleResell = async () => {
        const d = await fetch('/api/items/resell-marketplace-item', {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_name: modalDetails?.item_name, item_type: modalDetails?.item_type, price: newPrice }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.status === 200) {
                    setSuccessResell(true);
                }
                else if (res.status === 401) {
                    navigate('/login');
                }
                else {
                    setModalError(data.message);
                }
            });
    }

    if (props.credentials === null || props.credentials === undefined) {
        return null;
    }
    else {
        return (
            <Row style={{ padding: '2em', justifyContent: "space-between" }}>
                <Col>
                    <DividerSection>
                        <h3 style={{ color: 'white' }}>Your Purchased Items</h3>
                        <ItemCard list={props.credentials.purchased_items} showModal={setShowModal} />
                    </DividerSection>

                    <DividerSection>
                        <h3 style={{ color: 'white' }}>Your Sold Items</h3>
                        <ItemCard list={props.credentials.sold_items} showModal={setShowModal} />
                    </DividerSection>
                </Col>


                <Col className="about-container" xs={3} lg={3}>
                    <h2 className="profile-rows">My Profile</h2>
                    <Row className="profile-rows">
                        <Col>
                            <Image src={userProfilePhoto} width={100} roundedCircle={true} />
                        </Col>
                    </Row>
                    <Row className="profile-rows">
                        <Col style={{ fontWeight: 'bold' }}>
                            @{props.credentials.email.split("@")[0]}
                        </Col>
                    </Row>
                    <hr />
                    <Row className="profile-rows">
                        <Col>
                            <h5 style={{ color: "#ca8dfd" }}>Your Balance (ETH)</h5>
                            <h4>{props.credentials.balance}</h4>
                        </Col>
                    </Row>
                </Col>


                <Modal show={modalDetails !== null} onHide={() => { setShowModal(null); setModalError(null); setSuccessResell(false) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Details</Modal.Title>
                    </Modal.Header>
                    {successResell ? (
                        <div className="p-2">
                            <Row>
                                <Col style={{ textAlign: 'center' }} className="mt-2 mb-2">
                                    <Alert variant="success">
                                        Item added to marketplace.
                                    </Alert>
                                </Col>
                            </Row>

                            <Row>
                                <Col style={{ textAlign: 'center' }} className="mt-2 mb-2">
                                    <Button variant="dark" onClick={() => { navigate(0) }}>
                                        Close &amp; Reload
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )
                        :
                        (
                            <div className="p-2">
                                <h3 className="m-2" style={{ textAlign: 'center' }}>{modalDetails?.item_name}</h3>
                                {(modalDetails?.transaction !== undefined && modalDetails?.transaction !== null) && (
                                    <Row>
                                        <Col style={{ alignItems: 'center', textAlign: 'center' }}>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Buyer</th>
                                                        <th>Seller</th>
                                                        <th>Price</th>
                                                        <th>Time</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {modalDetails?.transaction.map((item, index) => (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{item.buyer}</td>
                                                            <td>{item.seller}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.time}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                )}

                                <Row>
                                    <Col style={{ alignItems: 'center', textAlign: 'center' }}>
                                        <Image src={modalDetails?.item_image} style={{ width: '40%', borderRadius: '0.5em', objectFit: 'cover', marginTop: 2 }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Modal.Body style={{ textAlign: 'center' }}>{modalDetails?.description}</Modal.Body>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Modal.Body>Owner: {modalDetails?.owner}</Modal.Body>
                                        <Modal.Body>Price (ETH): {modalDetails?.price}</Modal.Body>
                                    </Col>
                                </Row>
                                {modalError && (
                                    <Row>
                                        <Col>
                                            <Alert variant="danger" className="mb-4" >
                                                {modalError}
                                            </Alert>
                                        </Col>
                                    </Row>
                                )}

                                {(props.credentials.email === modalDetails?.owner) && (
                                    <Modal.Footer>
                                        <Form.Control
                                            placeholder="New price"
                                            aria-label="price"
                                            aria-describedby="new-price"
                                            className="w-100"
                                            key="new-price"
                                            onClick={(event) => setNewPrice(event.target.value)}
                                            type="number"
                                        />
                                        <Button variant="success" onClick={handleResell}>
                                            Resell this NFT
                                        </Button>
                                    </Modal.Footer>
                                )}
                            </div>
                        )
                    }
                </Modal>
            </Row>
        )
    }
}

export default Profile