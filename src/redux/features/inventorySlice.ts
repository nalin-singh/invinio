import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TRootState } from "../store";
import { InventoryItemSchema, TInventoryItem } from "~/types";
import { z } from "zod";

// thunks
export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async () => {
    const data = await axios("/api/inventory").then(
      (response) => response.data,
    );
    const isValid = z.array(InventoryItemSchema).parse(data);
    if (!isValid) {
      throw new Error("Inventory Payload Recieved from API is Invalid");
    }
    return data;
  },
);

export const addInventoryItem = createAsyncThunk(
  "inventory/addInventoryItem",
  async (item: TInventoryItem) => {
    const data = await axios
      .post(`/api/inventory`, item)
      .then((response) => response.data);
    const isValid = z.array(InventoryItemSchema).parse(data);
    if (!isValid) {
      throw new Error("Inventory Payload Recieved from API is Invalid");
    }
    return data;
  },
);

export const updateInventoryItem = createAsyncThunk(
  "inventory/updateInventoryItem",
  async (item: TInventoryItem) => {
    const data = await axios
      .put(`/api/inventory/${item.ID}`, item)
      .then((response) => response.data);
    const isValid = z.array(InventoryItemSchema).parse(data);
    if (!isValid) {
      throw new Error("Inventory Payload Recieved from API is Invalid");
    }
    return data;
  },
);

export const deleteInventoryItem = createAsyncThunk(
  "inventory/deleteInventoryItem",
  async (id: string) => {
    const data = await axios
      .delete(`/api/inventory/${id}`)
      .then((response) => response.data);
    const isValid = z.array(InventoryItemSchema).parse(data);
    if (!isValid) {
      throw new Error("Inventory Payload Recieved from API is Invalid");
    }
    return data;
  },
);

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    isLoading: false,
    error: false,
    data: Array<TInventoryItem>(),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInventory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(fetchInventory.rejected, (state) => {
      state.data = [];
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(fetchInventory.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(addInventoryItem.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(addInventoryItem.rejected, (state) => {
      state.data = [];
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(addInventoryItem.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateInventoryItem.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(updateInventoryItem.rejected, (state) => {
      state.data = [];
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(updateInventoryItem.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(deleteInventoryItem.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(deleteInventoryItem.rejected, (state) => {
      state.data = [];
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(deleteInventoryItem.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
  },
});

// actions

// selectors
export const selectInventory = (state: TRootState) => state.inventory;

export const inventoryReducer = inventorySlice.reducer;
