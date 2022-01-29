import {
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
} from "../type";

const initialState = {
  posts: [],
  loading: false,
  totalElements: 0,
  numOfElements: 0,
  pagingSize: 0,
  pageIndex: 0,
  pageLimit: 0,
  errorMsg: "",
};

export const getPostListRequest = (value) => ({
  type: POST_LOADING_REQUEST,
  value: value,
});

const PostListReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload.postList,
        pagingSize: action.payload.pagingSize,
        totalElements: action.payload.totalElements,
        numOfElements: action.payload.numOfElements,
        pageIndex: action.payload.pageIndex,
        pageLimit: action.payload.pageLimit,
      };
    case POST_LOADING_FAILURE:
      return {
        ...state,
        laoding: false,
      };
    default:
      return state;
  }
};

export default PostListReducer;
