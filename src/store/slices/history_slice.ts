import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HistoryState {
  plays: Play[];
}

export interface Play {
  squares: string[];
}

const initialState: HistoryState = {
  plays: [
    {
      squares: Array(9).fill(null),
    },
  ],
};

export const historySlice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {
    addPlay: (state, action: PayloadAction<string[]>) => {
      state.plays = state.plays.concat([
        {
          squares: action.payload,
        },
      ]);
    },
    resetHistoryTo: (state, action: PayloadAction<number>) => {
      state.plays = state.plays.slice(0, action.payload + 1);
    },
  },
});

export const { addPlay, resetHistoryTo } = historySlice.actions;
export default historySlice.reducer;
