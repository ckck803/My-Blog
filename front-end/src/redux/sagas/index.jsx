import { all, fork } from "redux-saga/effects";
import loginSaga from "./LoginSaga";
import PostListSaga from "./PostListSaga";

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(PostListSaga)]);
}
