import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiConfig = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export const getUserList = createAsyncThunk("getuserlist", async () => {
  try {
    const { data } = await apiConfig.get("todos?_limit=10");
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const addTodo = createAsyncThunk(
  "addtodo",
  async (payload: { userId: number; title: string; completed: boolean }) => {
    try {
      const { data } = await apiConfig.post("todos", payload);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const getSingleTodo = createAsyncThunk(
  "getSingleTodo",
  async (id: number) => {
    try {
      const { data } = await apiConfig.get("todos/" + id);
      return { data, status: true };
    } catch (error) {
      console.log(error);
      if (error.status === 404)
        return { message: "Data not found", status: false };
    }
  }
);
export const updateTodo = createAsyncThunk(
  "updatetodo",
  async (payload: {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
  }) => {
    try {
      const { id, ...rest } = payload;
      const { data } = await apiConfig.put("todos/" + id, rest);
      return data;
    } catch (error) {
      console.error(error);
      if (error.status === 404) return "Data not found";
    }
  }
);
