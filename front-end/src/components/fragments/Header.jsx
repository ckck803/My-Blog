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
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../redux/reducer/AuthReducer";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // const token = localStorage.getItem("token");
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onClickLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const onClickSignup = () => {
    setIsSignupOpen(!isSignupOpen);
  };

  const onClickLogout = () => {
    dispatch(logoutRequest());
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
          navbar={true}
        >
          <div>
            <ul className="navbar-nav lg-auto">
              <Nav className="nav-item active ml-auto d-felx">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </Nav>
              <Nav className="nav-item ml-auto d-felx">
                <Link to={"/about"} className="nav-link">
                  About
                </Link>
              </Nav>
              {/* <Nav className="nav-item ml-auto d-felx">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </Nav> */}

              {token && (
                <>
                  <Nav className="nav-item ml-auto d-felx">
                    <Link to={"/edit"} className="nav-link">
                      New
                    </Link>
                  </Nav>
                  <Nav className="nav-item ml-auto d-felx">
                    <NavLink className="nav-link btn" onClick={onClickLogout}>
                      Logout
                    </NavLink>
                  </Nav>
                </>
              )}

              {!token && (
                <>
                  <SignupModal
                    isSingupOpen={isSignupOpen}
                    onClickSignup={onClickSignup}
                  />
                  <LoginModal
                    isLoginOpen={isLoginOpen}
                    onClickLogin={onClickLogin}
                  />
                </>
              )}
            </ul>
          </div>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
