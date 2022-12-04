import { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Image, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";

export default function Auctions(props) {
    const [auctionItems, setAuctionItems] = useState(null);
    const [modalDetails, setShowModal] = useState(null);
    const [modalError, setModalError] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            fetch('/api/auction/all-auction-items')
                .then(async (res) => {
                    try {
                        const data = await res.json();
                        if (res.status === 200) {
                            setAuctionItems(data);
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
                })
        })();
    }, [])

    const handleJoinAuction = () => {
        
        return;
    }

    return (
        <Row style={{ padding: '2em', textAlign: "center", color: 'white' }}>
            <Col>
                <h3 style={{ marginBottom: '1em' }}>Auctions</h3>
                <h5 style={{ color: 'gray', textAlign: "center", marginBottom: '1.5em' }}>Live auctions you can join and bid right now!</h5>
                <Row>
                    <Col>
                        <Link to={"/create-auction-item"}>
                            <Button variant="success" className="mb-4">Add Item for Auction</Button>
                        </Link>
                    </Col>
                </Row>

                <ItemCard list={auctionItems} showModal={setShowModal} />

                {error && (
                    <Alert variant="danger" className="mb-4" >
                        {error}
                    </Alert>
                )}
            </Col>

            <Modal show={modalDetails !== null} onHide={() => { setShowModal(null); setModalError(null); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <div className="p-2">
                    <h3 className="m-2" style={{ textAlign: 'center' }}>{modalDetails?.item_name}</h3>
                    <Row>
                        <Col style={{ alignItems: 'center', textAlign: 'center' }}>
                            <Image src={modalDetails?.item_image} style={{ width: '80%', borderRadius: '0.5em', objectFit: 'cover', marginTop: 2 }} />
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
                            <Modal.Body>Expires at: {modalDetails?.expiration_time}</Modal.Body>
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

                    <Modal.Footer>
                        <Button variant="success" onClick={handleJoinAuction}>
                            Join Auction
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </Row>
    )
}