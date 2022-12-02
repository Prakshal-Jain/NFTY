import { Row, Col, Button, Modal, Image, Alert } from 'react-bootstrap';
import { useState } from 'react';
import ItemCard from "../components/ItemCard";
import successImg from "../assets/successful-buy.gif";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart(props) {
    const [modalError, setModalError] = useState(null);
    const [modalDetails, setShowModal] = useState(null);
    const [successBuy, setSuccessBuy] = useState(false);

    const navigate = useNavigate();

    if (props.credentials === null || props.credentials === undefined) {
        return null;
    }

    const showModal = (item) => {
        setSuccessBuy(false);
        setShowModal(item);
        setModalError(null);
    }

    const handleBuy = async () => {
        const d = await fetch('/api/items/buy-marketplace-item', {
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

    const handleDelete = async () => {
        const d = await fetch('/api/items/delete-from-shopping-cart', {
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
                    setShowModal(null);
                    navigate(0);    // to get the updated data
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
        <div className="p-3">
            <h3 style={{ color: 'white', textAlign: "center" }} className="mb-2">Your Shopping Card</h3>
            <ItemCard list={props.credentials.shopping_cart} showModal={showModal} />



            <Modal show={modalDetails !== null} onHide={() => { setShowModal(null); setSuccessBuy(false); setModalError(null); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                {successBuy ? (
                    <div className="p-2">
                        <Row>
                            <Col style={{ alignItems: 'center', textAlign: 'center' }}>
                                <Image src={successImg} style={{ width: '80%', borderRadius: '0.5em', objectFit: 'cover' }} className="mt-2 mb-2" />
                            </Col>
                        </Row>

                        <Row>
                            <Col style={{ textAlign: 'center' }} className="mt-2 mb-2">
                                <Alert variant="success">
                                    Congratulations on buying your NFT!
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
                                    Buy this NFT
                                </Button>
                                <Button variant="danger" onClick={handleDelete} >
                                    Delete from Shopping Cart
                                </Button>
                            </Modal.Footer>
                        </div>
                    )
                }
            </Modal>
        </div>
    )
}