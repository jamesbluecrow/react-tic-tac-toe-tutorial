import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../config_store";

export interface XIsNextState {
  value: boolean;
}

const initialState: XIsNextState = {
  value: true,
};

export const xIsNextSlice = createSlice({
  name: "xIsNext",
  initialState: initialState,
  reducers: {
    setTurnIsNext: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setTurnIsNext } = xIsNextSlice.actions;
export const selectXIsNext = (state: RootState) => state.xIsNext.value;
export default xIsNextSlice.reducer;
