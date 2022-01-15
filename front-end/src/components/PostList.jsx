import React from "react";
import Pagenation from "./fragments/Pagenation";

const PostList = () => {
  return (
    <div>
      <h1 class="my-4">
        Page Heading
        <small>Secondary Text</small>
      </h1>
      <div className="card mb-4">
        <img
          className="card-img-top"
          src="http://placehold.it/750x300"
          alt="Card image cap"
        />
        <div className="card-body">
          <h2 className="card-title"></h2>
          <p className="card-text"></p>
          <a href="#" className="btn btn-primary">
            Read More &rarr;
          </a>
        </div>
        <div className="card-footer text-muted">
          Posted on January 1, 2020 by
          <a href="#">Start Bootstrap</a>
        </div>
      </div>
      <Pagenation />
    </div>
  );
};

export default PostList;
