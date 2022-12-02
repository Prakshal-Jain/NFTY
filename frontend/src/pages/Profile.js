import "./css/profile.css";
import userProfilePhoto from '../assets/1.png';
import { Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import ItemCard from "../components/ItemCard";

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
    if (props.credentials === null || props.credentials === undefined) {
        return null;
    }
    else {
        return (
            <Row style={{ padding: '2em', justifyContent: "space-between" }}>
                <Col>
                    <DividerSection>
                        <h3 style={{ color: 'white' }}>Your Purchased Items</h3>
                        <ItemCard list={props.credentials.purchased_items} />
                    </DividerSection>

                    <DividerSection>
                        <h3 style={{ color: 'white' }}>Your Sold Items</h3>
                        <ItemCard list={props.credentials.sold_items} />
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
            </Row>
        )
    }
}

export default Profile