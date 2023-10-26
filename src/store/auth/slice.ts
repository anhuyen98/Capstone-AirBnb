import { createSlice } from "@reduxjs/toolkit";
import { UserLogin } from "types";
import { authLoginThunk } from ".";
import { getTokenUser } from "utils";
import { getIdUser } from "utils/getIdUser";

type authInitialState = {
  token?: string;
  userLogin?: UserLogin;
  isFetchingLogin?: boolean;
  id?: string
};

const initialState: authInitialState = {
  token: getTokenUser(),
  id: getIdUser(),
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
        localStorage.setItem("ID", String(payload.user.id))
      })
      .addCase(authLoginThunk.rejected, (state) => {
        state.isFetchingLogin = false;
      });
  },
});

export const { reducer: authReducer, actions: authActions } = authSlice;
