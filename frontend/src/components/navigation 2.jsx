import React from 'react';
import {Navbar, Nav, NavDropdown} from "react-bootstrap"

const Navigation = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Klassez</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            {/*<NavDropdown.Item href="/retail">Overview</NavDropdown.Item>*/}
                            <NavDropdown.Item href="#">Dropdown 1</NavDropdown.Item>
                            <NavDropdown.Item href="#">Dropdown 2</NavDropdown.Item>
                            <NavDropdown.Item href="#">Dropdown 3</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/profile">My Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navigation;