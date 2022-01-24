import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPostListRequest } from "../redux/reducer/PostListReducer";
import { store, persistor } from "../store";
import dotenv from "dotenv";
dotenv.config();

const getPostList = ({ page }) => {
  console.log(process.env.REACT_APP_POST_LIST_SESSION_STORAGE);
  const posts = sessionStorage.getItem(
    process.env.REACT_APP_POST_LIST_SESSION_STORAGE
  );

  if (posts) {
    return;
  }

  const postList = JSON.parse(posts);
  // console.log(postList);

  if (postList) {
    return;
  }

  store.dispatch(getPostListRequest(page));
};

export default getPostList;
