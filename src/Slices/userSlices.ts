import { addTodo, getSingleTodo, getUserList } from "./userAsyncThunk.ts";
import { initialStateTypes } from "./userTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: initialStateTypes = {
  singleTodo: {
    userId: 0,
    id: 0,
    title: "",
    completed: false,
  },
  loading: false,
  error: "",
  list: [],
};
const todoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteTodo: (state, { payload }) => {
      state.list = state.list.filter((item) => item.id !== payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.list = payload;
    });
    builder.addCase(getUserList.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getSingleTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.singleTodo = payload?.data;
    });
    builder.addCase(getSingleTodo.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.list = [...state.list, payload];
    });
    builder.addCase(addTodo.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default todoSlice.reducer;
export const todoActions = todoSlice.actions;
