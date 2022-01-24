import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import persistentReducer from "./redux/reducer/index";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./redux/sagas/index";
import { persistStore } from "redux-persist";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  // createRootReducer,
  persistentReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
