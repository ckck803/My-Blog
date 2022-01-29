import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
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
dotenv.config();

const loginUserAPI = (loginData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return (
    axios
      // .post("http://localhost:8080/api/login", JSON.stringify(loginData), config)
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
        console.log(err);
      })
  );
};

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

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
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

function* watchLogoutUser() {
  yield takeLatest(LOGOUT_REQUEST, logoutUser);
}

export default function* AuthSaga() {
  yield all([fork(watchLoginUser), fork(watchLogoutUser)]);
}
