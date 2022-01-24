import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditPage from "../pages/EditPage";
import MainPage from "../pages/MainPage";
import PostPage from "../pages/PostPage";

const BlogRoute = () => {
  return (
    <Fragment>
      <Fragment />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit" element={<EditPage />} />
          {/* <Route path="/login" /> */}
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default BlogRoute;
