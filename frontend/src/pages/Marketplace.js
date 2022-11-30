import { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";

export default function Marketplace(props) {
    const [marketplaceItems, setMarketplaceItems] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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
                <ItemCard list={marketplaceItems} />
            </Col>
        </Row>
    )
}