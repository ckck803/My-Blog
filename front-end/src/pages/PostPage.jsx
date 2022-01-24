import React from "react";
import MainTemplate from "../components/templates/MainTemplate";
import PostDetails from "../components/PostDetails";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();
  return (
    <MainTemplate>
      <PostDetails id={id} />
    </MainTemplate>
  );
};

export default PostPage;
