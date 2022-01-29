import {
  POST_EDIT_FAILURE,
  POST_EDIT_REQUEST,
  POST_EDIT_SUCCESS,
} from "../type";

const initialState = {
  title: null,
  subTitle: null,
  category: null,
  content: "",
  author: null,
};

export const postEdit = (value) => ({
  type: POST_EDIT_REQUEST,
  payload: value,
});

const PostEditReducer = (state = initialState, action) => {
  switch (action) {
    case POST_EDIT_REQUEST:
      return {
        ...state,
      };
    case POST_EDIT_SUCCESS:
      return {
        ...state,
      };
    case POST_EDIT_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default PostEditReducer;
