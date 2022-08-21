import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginApi } from "../API/authApi";

const initialState = {
  isLoggedIn: false,
  username: "",
  token: "",
  loading: "idle",
  error: "",
};

export const login = createAsyncThunk("auth/login", async (body, thunkApi) => {
  const data = await loginApi(body);
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    init: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.error = "";
      state.username = "";
      state.loading = "idle";
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, _) => {
        state.loading = "pending";
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        const data = action.payload;
        state.loading = "success";
        state.error = "";
        state.isLoggedIn = true;
        state.token = data.token;
        state.username = data.username;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.error);
        state.error = action.error?.message || "login failed!";
        state.loading = "idle";
      });
  },
});

export const { logout, init } = authSlice.actions;
