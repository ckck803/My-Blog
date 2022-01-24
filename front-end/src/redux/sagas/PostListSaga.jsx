import axios from "axios";
import dotenv from "dotenv";
import {
  all,
  call,
  takeEvery,
  fork,
  put,
  throttle,
  takeLatest,
} from "redux-saga/effects";
import {
  POST_LAODING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_NEXT_REQUEST,
} from "../type";
dotenv.config();
// Authorization: "Bearer " + localStorage.getItem("token"),
const getPostListAPI = (paging) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    params: {
      page: paging.page,
      size: paging.size,
    },
  };
  const Posts = axios
    .get(process.env.REACT_APP_POST_LIST_API_URL, config)
    .then((Response) => {
      return Response.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return Posts;
};

function* PostRequest(action) {
  try {
    const paging = {
      page: action.value,
      size: process.env.REACT_APP_PAGE_SIZE,
    };
    const Posts = yield call(getPostListAPI, paging);
    yield put({
      type: POST_LOADING_SUCCESS,
      payload: Posts,
    });
  } catch (e) {
    yield put({
      type: POST_LAODING_FAILURE,
    });
  }
}

function* watchPostRequest() {
  yield takeEvery(POST_LOADING_REQUEST, PostRequest);
}

export default function* PostListSaga() {
  yield all([fork(watchPostRequest)]);
}
