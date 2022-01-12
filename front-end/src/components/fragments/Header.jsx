import React, { useState } from 'react';
import { Collapse, Container, Nav, Navbar, NavbarToggler } from 'reactstrap';



const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const onToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Navbar color="dark" dark expand="lg" className="sticky-top">
            <Container>
                <a className="navbar-brand" href="#">Victor</a>
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}

                <NavbarToggler onClick={onToggle} />
                <Collapse isOpen={isOpen} className="lg-auto d-felx justify-content-end" navbar>
                    <div>
                        <ul className="navbar-nav lg-auto" navbar>
                            <Nav className="nav-item active ml-auto d-felx" navbar>
                                <a className="nav-link" href="#">Home</a>
                            </Nav>
                            <Nav className="nav-item ml-auto d-felx">
                                <a className="nav-link" href="#">About</a>
                            </Nav>
                            <Nav className="nav-item ml-auto d-felx">
                                <a className="nav-link" href="#">Services</a>
                            </Nav>
                            <Nav className="nav-item ml-auto d-felx">
                                <a className="nav-link" href="#">Contact</a>
                            </Nav>
                            <Nav className="ml-auto d-felx" navbar>
                                {false ? (<li className="nav-item">
                                    <a className="nav-link" href="#">Login</a>
                                </li>) : (<li className="nav-item">
                                    <a className="nav-link" href="#">Logout</a>
                                </li>)
                                }
                            </Nav>
                        </ul>
                    </div>
                </Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;