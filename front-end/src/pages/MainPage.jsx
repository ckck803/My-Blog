import React from "react";
import MainTemplate from "../components/templates/MainTemplate";
import PostList from "../components/PostList";
import { useLocation, useParams } from "react-router-dom";
import QueryString from "qs";
import { useDispatch, useSelector } from "react-redux";
import { getPostListRequest } from "../redux/reducer/PostListReducer";
import getPostList from "../components/getPostList";
import { useEffect } from "react";

// initPostList();

const MainPage = () => {
  const location = useLocation();

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const page = queryData.page ? queryData.page : 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostListRequest(page));
  }, [dispatch, page]);

  return (
    <MainTemplate>
      <PostList />
    </MainTemplate>
  );
};

export default MainPage;
