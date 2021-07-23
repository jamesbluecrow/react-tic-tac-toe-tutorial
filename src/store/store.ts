import { configureStore } from "@reduxjs/toolkit";
import stepSliceReducer from "./slices/step_number_slice";
import xIsNextSlice from "./slices/x_isnext_slice";
import historySlice from "./slices/history_slice";

export const store = configureStore({
  reducer: {
    stepCounter: stepSliceReducer,
    xIsNext: xIsNextSlice,
    history: historySlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
