import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getPostListRequest } from "../../redux/reducer/PostListReducer";

const Pagenation = () => {
  const dispatch = useDispatch();
  const { pageIndex, pageLimit } = useSelector((state) => state.postList);
  // const onClickNext = useCallback(
  //   (e) => {
  //     dispatch(getPostListRequest(pageIndex + 1));
  //   },
  //   [dispatch, pageIndex]
  // );
  // const onClickPrev = useCallback(
  //   (e) => {
  //     if (pageIndex > 0) {
  //       dispatch(getPostListRequest(pageIndex - 1));
  //     }
  //   },
  //   [dispatch, pageIndex]
  // );

  return (
    <ul class="pagination justify-content-center mb-4">
      <li class="page-item">
        {/* <li class={pageIndex > 0 ? "page-item" : "page-item disabled"}> */}
        {/* <button className="page-link" onClick={onClickPrev}>
          &larr; Older
        </button> */}
        <Link to={`/?page=${pageIndex - 1}`} className="page-link">
          &larr; Older
        </Link>
      </li>
      {/* <li class={pageLimit > pageIndex ? "page-item " : "page-item disabled"}> */}
      <li class="page-item">
        {/* <button className="page-link" onClick={onClickNext}>
          Newer &rarr;
        </button> */}
        <Link to={`/?page=${pageIndex + 1}`} className="page-link">
          Newer &rarr;
        </Link>
      </li>
    </ul>
  );
};

export default Pagenation;
