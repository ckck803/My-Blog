import React from "react";
import { Link } from "react-router-dom";

const PostListItem = ({ post }) => {
  return (
    <div className="card mb-4">
      <img className="card-img-top" src="http://placehold.it/750x300" />
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="card-text">{post.content.substr(0, 200)}</p>
        <Link to={"/post/" + post.id} className="btn btn-primary" id={post.id}>
          Read More &rarr;
        </Link>
      </div>
      <div className="card-footer text-muted">
        Posted on January 1, 2020 by {post.author}
      </div>
    </div>
  );
};

export default PostListItem;
