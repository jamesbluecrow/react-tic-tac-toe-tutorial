import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../config_store";

export interface StepState {
  value: number;
}

const initialState: StepState = {
  value: 0,
};

export const stepSlice = createSlice({
  name: "stepNumber",
  initialState: initialState,
  reducers: {
    incrementSteps: (state) => {
      state.value += 1;
    },
    resetStepsTo: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { incrementSteps, resetStepsTo } = stepSlice.actions;
export const selectStepValue = (state: RootState) => state.stepCounter.value;
export default stepSlice.reducer;
