import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import stepSliceReducer from "./slices/step_number_slice";
import { combineReducers, createStore } from "@reduxjs/toolkit";
import xIsNextSlice from "./slices/x_isnext_slice";
import historySlice from "./slices/history_slice";

const persistConfig = {
  key: "root",
  storage,
};

let rootReducer = combineReducers({
  stepCounter: stepSliceReducer,
  xIsNext: xIsNextSlice,
  history: historySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
