import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    pending: false,
    error: false,
  },
  reducers: {
    getChatsStart: (state) => {
      state.pending = true;
    },
    getChatsSuccess: (state, action) => {
      state.pending = false;
      state.chats = action.payload;
    },
    getChatsFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export default chatSlice.reducer;
export const { getChatsFailure, getChatsStart, getChatsSuccess } =
  chatSlice.actions;