import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import PostListReducer from "./PostListReducer";
import SignupReducer from "./SignupReducer";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
// import storage from "redux-persist/lib/storage";

// const persistPostListConfig = {
//   key: "postList",
//   storage: storageSession,
//   // whitelist: ["postList"],
// };

const createRootReducer = combineReducers({
  login: LoginReducer,
  postList: PostListReducer,
  // postList: persistReducer(persistPostListConfig, PostListReducer),
  // SignupReducer: SignupReducer,
});

const persistConfig = {
  key: "postList",
  storage: storageSession,
  whitelist: ["postList"],
};

// export default createRootReducer;
export default persistReducer(persistConfig, createRootReducer);
