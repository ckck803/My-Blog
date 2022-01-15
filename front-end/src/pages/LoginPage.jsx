import React, { useState, useCallback } from "react";
import { NavLink } from "reactstrap";
import {
  LoginBody,
  LoginFooter,
  LoginHeader,
  ModalBackGround,
  ModalBox,
} from "../assets/css/login";

const LoginPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
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

  const onClickLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <div>
      <NavLink className="nav-link" onClick={onClickLogin} href="#">
        Login
      </NavLink>
      {isLoginOpen && (
        <ModalBackGround>
          <ModalBox>
            <LoginHeader>로그인</LoginHeader>
            <LoginBody className="login-body">
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={onChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </div>
            </LoginBody>
            <LoginFooter>
              <button onClick={onClickLogin}>닫기</button>
            </LoginFooter>
          </ModalBox>
        </ModalBackGround>
      )}
    </div>
  );
};

export default LoginPage;
