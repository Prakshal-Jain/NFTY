import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'

function AuthNavBar(props) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">NFTY</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/#auction">Auctions</Nav.Link>
                        <Nav.Link href="/#buy_sell">Buy &amp; Sell</Nav.Link>
                    </Nav>
                    {props.credentials !== null && (
                        <Nav>
                            <Image src={props.credentials.profilePhoto} roundedCircle={true} width={30} />
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AuthNavBar