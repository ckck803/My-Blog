import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from "../type";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  username: "",
  email: "",
  userRole: "",
  errorMsg: "",
  successMsg: "",
};

export const loginRequest = (form) => ({
  type: LOGIN_REQUEST,
  payload: form,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      console.log("로그인 요청에 성공했습니다.");
      const token = localStorage.getItem("token");
      const secret = process.env.REACT_APP_JWT_SECRET;
      const body = Jwt.verify(
        token.substring(7),
        Buffer.from(secret).toString("base64")
      );

      return {
        ...state,
        token: token,
        isAuthenticated: true,
        email: body.sub,
        // username: action.payload.user.username,
      };
    case LOGIN_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        username: "",
        email: "",
        userRole: "",
        errorMsg: "",
        successMsg: "",
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        username: "",
        email: "",
        userRole: "",
        // errorMsg: action.payload.auth.msg,
        successMsg: "",
      };

    default:
      return state;
  }
};

export default AuthReducer;