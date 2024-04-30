import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TRootState } from "../store";

export type TGeneralState = {
  isDarkMode: boolean;
};

const initialState: TGeneralState = {
  isDarkMode: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

// actions
export const { toggleTheme } = generalSlice.actions;

// selectors
export const selectTheme = (state: TRootState) => state.general.isDarkMode;

export const generalReducer = generalSlice.reducer;
