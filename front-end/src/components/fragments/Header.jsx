import React, { Fragment, useState } from "react";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarToggler,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onClickLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const onClickSignup = () => {
    setIsSignupOpen(!isSignupOpen);
  };

  return (
    <Navbar color="dark" dark expand="lg" className="sticky-top">
      <Container>
        <Link to={"/"} className="navbar-brand">
          Victor
        </Link>
        <NavbarToggler onClick={onToggle} />
        <Collapse
          isOpen={isOpen}
          className="lg-auto d-felx justify-content-end"
          navbar
        >
          <div>
            <ul className="navbar-nav lg-auto" navbar>
              <Nav className="nav-item active ml-auto d-felx" navbar>
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </Nav>
              <Nav className="nav-item ml-auto d-felx">
                <Link to={"/about"} className="nav-link">
                  About
                </Link>
              </Nav>
              <Nav className="nav-item ml-auto d-felx">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </Nav>
              <Nav>
                {!false && (
                  <Fragment>
                    <SignupModal
                      isSingupOpen={isSignupOpen}
                      onClickSignup={onClickSignup}
                    />
                    <LoginModal
                      isLoginOpen={isLoginOpen}
                      onClickLogin={onClickLogin}
                    />
                  </Fragment>
                )}
              </Nav>
            </ul>
          </div>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
