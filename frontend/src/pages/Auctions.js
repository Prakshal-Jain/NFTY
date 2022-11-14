import { Row, Col } from 'react-bootstrap';
import ItemCard from "../components/ItemCard";

export default function Auctions(props) {
    return (
        <Row style={{ padding: '2em', textAlign: "center", color: 'white' }}>
            <Col>
                <h3 style={{ marginBottom: '2em' }}>Auctions</h3>
                <ItemCard list={props.auctionItems} />
            </Col>
        </Row>
    )
}