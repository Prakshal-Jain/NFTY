import { Row, Col, Image } from 'react-bootstrap';
import "./css/itemcard.css";

export default function ItemCard(props) {
    if (props.list === undefined || props.list === null || props.list.length === 0) {
        return (
            <Row style={{ color: '#a9a9a9a9', textAlign: 'center' }}>
                <Col>
                    No items found
                </Col>
            </Row>
        )
    }

    return (
        <Row style={{ justifyContent: 'space-between' }}>
            {props.list.map((item, index) => (
                <Col key={`item-${index}`} xs={6} lg={3} className="item-card-container" onClick={() => props.showModal(item)}>
                    <Row>
                        <Col>
                            <Image src={item.item_image} className="card-image" />
                        </Col>
                    </Row>
                    <Row style={{ fontWeight: 'bold' }}>
                        <Col>
                            {item.item_name}
                        </Col>
                    </Row>
                </Col>
            ))}
        </Row>
    )
}