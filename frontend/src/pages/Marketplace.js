import { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";

export default function Marketplace(props) {
    const [marketplaceItems, setMarketplaceItems] = useState(null);
    const [error, setError] = useState(null);
    const [modalDetails, setShowModal] = useState(null);

    const navigate = useNavigate();

    const showModal = (item) => {
        setShowModal(item);
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
                <ItemCard showModal={showModal} list={[
                    {
                        "_id": "6387e4f88ad8819c5bd6018c",
                        "item_name": "Heyy",
                        "item_image": "https://tesla-cdn.thron.com/delivery/public/image/tesla/3863f3e5-546a-4b22-bcbc-1f8ee0479744/bvlatuR/std/1200x628/MX-Social",
                        "description": "I want money!",
                        "price": 2000
                    }
                ]} />


                <Modal show={modalDetails !== null} onHide={() => setShowModal(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Details</Modal.Title>
                    </Modal.Header>
                    <h3 className="m-2" style={{ textAlign: 'center' }}>{modalDetails?.item_name}</h3>
                    <Row>
                        <Col style={{alignItems: 'center', textAlign: 'center'}}>
                            <Image src={modalDetails?.item_image} style={{ width: '80%', borderRadius: '0.5em', objectFit: 'cover', marginTop: 2 }} />
                        </Col>
                    </Row>
                    <Modal.Body style={{textAlign: 'center'}}>{modalDetails?.description}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => setShowModal(null)}>
                            Buy this NFT
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </Row>
    )
}