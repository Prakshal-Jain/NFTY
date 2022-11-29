import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate } from "react-router-dom";

function AuthNavBar(props) {
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null)

    const onLogOut = async () => {
        fetch('/api/users/logout')
        .then(async (res) => {
            try {
                const data = await res.json();
                if (res.status === 200) {
                    setRedirect(true);
                }
                else {
                    setError(data);
                    setRedirect(false);
                }
            }
            catch (err) {
                setError("An error occured.");
                setRedirect(false);
            }
        })
        props.onLogout();
        setRedirect(true);
    }

    if(redirect){
        return <Navigate to={"/login"} />
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">NFTY</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/auctions">Auctions</Nav.Link>
                        <Nav.Link href="/marketplace">Buy &amp; Sell</Nav.Link>
                    </Nav>
                    {props.credentials !== null && (
                        <Nav>
                            <NavDropdown title={props.credentials.email.split("@")[0]}>
                                <NavDropdown.Item href="/profile">
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={onLogOut}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AuthNavBar