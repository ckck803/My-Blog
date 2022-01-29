import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditPage from "../pages/EditPage";
import MainPage from "../pages/MainPage";
import NotFound from "../pages/NotFound";
import PostPage from "../pages/PostPage";

const BlogRoute = () => {
  return (
    <Fragment>
      <Fragment />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          {/* <Route path="/login" /> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default BlogRoute;
