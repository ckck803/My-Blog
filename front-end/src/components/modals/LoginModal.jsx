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
// import { loginRequest } from "../../redux/reducer/AuthReducer";
import { loginRequest } from "../../redux/reducer/AuthReducer";

// 아직도 인턴 때 봤던 gobun 변수명을 잊지 못한다...... 문화충격 그 자체..... 더 놀라운건 지금 그 팀에서 일하고 있다는 것.......
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
    console.log(form);
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
