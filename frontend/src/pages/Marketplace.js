import { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Image, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";


export default function Marketplace(props) {
    const [marketplaceItems, setMarketplaceItems] = useState(null);
    const [error, setError] = useState(null);
    const [modalError, setModalError] = useState(null);
    const [modalDetails, setShowModal] = useState(null);
    const [successBuy, setSuccessBuy] = useState(false);

    const navigate = useNavigate();

    const showModal = (item) => {
        setSuccessBuy(false);
        setShowModal(item);
        setModalError(null);
    }

    useEffect(() => {
        (async () => {
            fetch('/api/items/all-marketplace-items')
                .then(async (res) => {
                    try {
                        const data = await res.json();
                        if (res.status === 200) {
                            setMarketplaceItems(data);
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

    const handleBuy = async () => {
        const d = await fetch('/api/items/add-shoppingcart-item', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_name: modalDetails?.item_name, item_type: modalDetails?.item_type }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.status === 200) {
                    setSuccessBuy(true);
                }
                else if (res.status === 401) {
                    navigate('/login');
                }
                else {
                    setModalError(data.message);
                }
            });
    }

    return (
        <Row style={{ padding: '2em', textAlign: "center", color: 'white' }}>
            <Col>
                <h3 className="mb-3">Marketplace</h3>
                <Row className="flex-column-reverse">
                    <Col>
                        <Link to={"/marketplace-sell"}>
                            <Button variant="success" className="mb-4">Sell an NFT</Button>
                        </Link>
                    </Col>
                </Row>
                <ItemCard showModal={showModal} list={marketplaceItems} />

                {error && (
                    <Alert variant="danger" className="mb-4" >
                        {error}
                    </Alert>
                )}


                <Modal show={modalDetails !== null} onHide={() => { setShowModal(null); setSuccessBuy(false); setModalError(null); }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Details</Modal.Title>
                    </Modal.Header>
                    {successBuy ? (
                        <div className="p-2">
                            <Row>
                                <Col style={{ alignItems: 'center', textAlign: 'center' }} className="mt-2">
                                    <Alert variant="success">
                                        Item successfully added to shopping cart.
                                    </Alert>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ textAlign: 'center' }} className="mt-2 mb-2">
                                    <Button variant="dark" onClick={() => { setShowModal(null); setSuccessBuy(false); setModalError(false); }}>
                                        Close
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )
                        :
                        (
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
                                    <Button variant="success" onClick={handleBuy}>
                                        Add to shopping card
                                    </Button>
                                </Modal.Footer>
                            </div>
                        )
                    }
                </Modal>
            </Col >
        </Row >
    )
}