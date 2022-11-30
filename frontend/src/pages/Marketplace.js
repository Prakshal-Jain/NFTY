import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemCard from "../components/ItemCard";

export default function Marketplace(props) {
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
                <ItemCard list={props.marketplaceItems} />
            </Col>
        </Row>
    )
}