import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./Slices/userSlices.ts";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    userState: todoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
