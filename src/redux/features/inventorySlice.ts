import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TRootState } from "../store";
import { TInventoryItem } from "~/types";

const initialState: Array<TInventoryItem> = [];

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    updateInventory: (_, action: PayloadAction<Array<TInventoryItem>>) => {
      return action.payload;
    },
  },
});

// actions
export const { updateInventory } = inventorySlice.actions;

// selectors
export const selectInventory = (state: TRootState) => state.inventory;

export const inventoryReducer = inventorySlice.reducer;
