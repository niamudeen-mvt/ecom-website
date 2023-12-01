import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";

const persistConfig = {
  key: "ecommerce-cart",
  storage: localStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));

const persistor = persistStore(store);

export { store, persistor };
