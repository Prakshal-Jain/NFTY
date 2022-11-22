import { Row, Col } from 'react-bootstrap';
import ItemCard from "../components/ItemCard";

export default function Auctions(props) {
    return (
        <Row style={{ padding: '2em', textAlign: "center", color: 'white' }}>
            <Col>
                <h3 style={{ marginBottom: '1em' }}>Auctions</h3>
                <h5 style={{color: 'gray', textAlign: "center", marginBottom: '1.5em'}}>Live auctions you can join and bid right now!</h5>
                <ItemCard list={props.auctionItems} />
            </Col>
        </Row>
    )
}