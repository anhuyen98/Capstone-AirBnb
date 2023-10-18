import { createSlice } from "@reduxjs/toolkit";
import { UserLogin } from "types";
import { authLoginThunk } from ".";

type authInitialState = {
  token?: string;
  userLogin?: UserLogin;
  isFetchingLogin?: boolean;
};

const initialState: authInitialState = {
  token: localStorage.getItem("TOKEN"),
  isFetchingLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //
  },
  extraReducers(builder) {
    builder
      .addCase(authLoginThunk.pending, (state) => {
        state.isFetchingLogin = true;
      })
      .addCase(authLoginThunk.fulfilled, (state, { payload }) => {
        state.userLogin = payload.user;
        state.isFetchingLogin = false;
        localStorage.setItem("TOKEN", payload.token);
      })
      .addCase(authLoginThunk.rejected, (state) => {
        state.isFetchingLogin = false;
      });
  },
});

export const { reducer: authReducer, actions: authActions } = authSlice;
