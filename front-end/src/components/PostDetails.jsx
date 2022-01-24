import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostListRequest } from "../redux/reducer/PostListReducer";
import Comment from "./fragments/Comment";

const PostDetails = ({ id }) => {
  const post = useSelector((state) => state.postList.posts[id - 1]);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!post) {
  //     dispatch(getPostListRequest(0));
  //   }
  // }, [dispatch, post]);

  const TimeLine = ({ post }) => {
    const createdTime = new Date(post);
    const yymmdd = createdTime.toLocaleDateString();
    const timeStamp = createdTime.toLocaleTimeString();

    return <p>{"Created : " + yymmdd + " " + timeStamp}</p>;
  };

  return (
    <div className="row">
      {post && (
        <div>
          <h1 className="mt-4">{post.title}</h1>
          <p className="lead">{post.subtitle}</p>
          <hr />
          <TimeLine post={post.createdTime} />
          <hr />
          <img
            class="img-fluid rounded"
            src="http://placehold.it/900x300"
            alt=""
          />
          <hr />
          <p>{post.content}</p>
          <hr />
          <Comment />
        </div>
      )}
    </div>
  );
};

export default PostDetails;
