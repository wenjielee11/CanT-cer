import React from "react";
import { Navbar } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            className="d-flex justify-content-center"
        >
            <Navbar.Brand href="#home">The Can-Tcer Model</Navbar.Brand>
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                </Nav>
            </Navbar.Collapse> */}
        </Navbar>
    );
};

export default Header;
