import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../type";
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import dotenv from "dotenv";
import { Cookies } from "react-cookie";
dotenv.config();

const signupUserAPI = (signupData) => {
  const cookies = new Cookies();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": cookies.get("XSRF-TOKEN"),
    },
  };

  return axios
    .post(
      process.env.REACT_APP_SIGNUP_API_URL,
      JSON.stringify(signupData),
      config
    )
    .then((response) => {
      console.log("회원 가입에 성공 했습니다.");
    })
    .catch((err) => {
      console.log(err);
    });
};

const loginUserAPI = (loginData) => {
  const cookies = new Cookies();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": cookies.get("XSRF-TOKEN"),
    },
  };

  return axios
    .post(
      process.env.REACT_APP_LOGIN_API_URL,
      JSON.stringify(loginData),
      config
    )
    .then((response) => {
      console.log("로그인 요청에 성공했습니다.");
      localStorage.setItem("token", response.headers.authorization);
      return response;
    })
    .catch((err) => {
      console.log("로그인 요청에 실패했습니다.");
      console.log(err);
    });
};

function* signupUser(action) {
  try {
    yield call(signupUserAPI, action.payload);
    yield put({
      type: SIGNUP_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: SIGNUP_FAILURE,
    });
  }
}

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log(result);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
    });
  }
}

function* logoutUser(action) {
  try {
    console.log("Request Logout");
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    });
  }
}

function* watchSignupUser() {
  yield takeEvery(SIGNUP_REQUEST, signupUser);
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

function* watchLogoutUser() {
  yield takeLatest(LOGOUT_REQUEST, logoutUser);
}

export default function* AuthSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchSignupUser),
  ]);
}
