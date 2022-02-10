import React, { useState, useCallback } from "react";
import { Nav, NavLink } from "reactstrap";
import { useDispatch } from "react-redux";
import {
  LoginBody,
  LoginFooter,
  LoginHeader,
  ModalBackGround,
  ModalBox,
} from "../../assets/css/login";
import { loginRequest } from "../../redux/reducer/AuthReducer";

const LoginModal = ({ isLoginOpen, onClickLogin }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = useCallback(
    (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    },
    [form]
  );

  const dispatch = useDispatch();
  const onLoginEvnet = (e) => {
    dispatch(loginRequest(form));
    onClickLogin();
  };

  return (
    <Nav className="nav-item ml-auto d-felx">
      <NavLink className="nav-link btn" onClick={onClickLogin}>
        Log In
      </NavLink>
      {isLoginOpen && (
        <ModalBackGround>
          <ModalBox>
            <LoginHeader>
              로그인
              <button className="close" onClick={onClickLogin}>
                {" "}
                &times;{" "}
              </button>
            </LoginHeader>
            <LoginBody className="login-body">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={onChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </div>
            </LoginBody>
            <LoginFooter>
              <button onClick={onLoginEvnet}>로그인</button>
            </LoginFooter>
          </ModalBox>
        </ModalBackGround>
      )}
    </Nav>
  );
};

export default LoginModal;
