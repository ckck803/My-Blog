import React from "react";
import MainTemplate from "../components/templates/MainTemplate";
import PostList from "../components/PostList";

const MainPage = () => {
  return (
    <MainTemplate>
      <PostList />
    </MainTemplate>
  );
};

export default MainPage;
