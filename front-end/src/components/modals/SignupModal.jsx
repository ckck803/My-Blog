import React, { Fragment, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { ModalBox } from "../../assets/css/login";
import { Nav, NavLink } from "reactstrap";
import {
  ModalBackGround,
  SignUpBody,
  SignUpFooter,
  SignUpHeader,
} from "../../assets/css/signup";
import { signupRequest } from "../../redux/reducer/AuthReducer";

const SignupModal = ({ isSingupOpen, onClickSignup }) => {
  const [form, setForm] = useState({
    username: "",
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

  // const onClickSignUp = useCallback(() => {
  //   axios.post("/api/signup", form).then((Response) => {
  //     console.log(Response);
  //   });
  // }, [form]);

  const dispatch = useDispatch();
  const onSignupEvent = (e) => {
    console.log("onClickSignUp");
    dispatch(signupRequest(form));
    onClickSignup();
  };

  return (
    <Nav className="nav-item ml-auto d-felx">
      <NavLink className="nav-link btn" onClick={onClickSignup}>
        Sign Up
      </NavLink>
      {isSingupOpen && (
        <ModalBackGround className="signup-modal-box">
          <ModalBox>
            <SignUpHeader>
              회원 가입
              <button className="close" onClick={onClickSignup}>
                {" "}
                &times;{" "}
              </button>
            </SignUpHeader>
            <SignUpBody>
              <div>
                <input
                  type="username"
                  id="username"
                  name="username"
                  placeholder="이름"
                  onChange={onChange}
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={onChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </div>
            </SignUpBody>
            <SignUpFooter>
              <button onClick={onSignupEvent}>회원가입</button>
            </SignUpFooter>
          </ModalBox>
        </ModalBackGround>
      )}
    </Nav>
  );
};

export default SignupModal;
