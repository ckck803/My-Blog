import { all, fork } from "redux-saga/effects";
import AuthSaga from "./AuthSaga";
import PostListSaga from "./PostListSaga";

export default function* rootSaga() {
  yield all([fork(AuthSaga), fork(PostListSaga)]);
}
