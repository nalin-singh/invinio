import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TRootState } from "../store";

export type TAuthState = {
  authState: boolean;
};

const initialState: TAuthState = {
  authState: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
  },
});

// actions
export const { changeAuthState } = authSlice.actions;

// selectors
export const selectAuthState = (state: TRootState) => state.auth.authState;

export const authReducer = authSlice.reducer;
