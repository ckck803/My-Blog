import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostListRequest } from "../redux/reducer/PostListReducer";
import Pagenation from "./fragments/Pagenation";
import PostListItem from "./PostListItem";
import { useCallback } from "react";

const PostList = ({ pageIndex, page }) => {
  const postList = useSelector((state) => state.postList);

  return (
    <div>
      <h1 className="my-4">Page Heading</h1>
      <div className="mb-4">
        {postList.posts &&
          postList.posts.map((post) => {
            return <PostListItem key={post.id} post={post} />;
          })}{" "}
      </div>
      <Pagenation />
    </div>
  );
};

export default PostList;
