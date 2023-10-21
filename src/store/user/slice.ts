import { createSlice } from "@reduxjs/toolkit";
import { getListUserThunk, getUserByIdThunk } from ".";
import { UserLogin } from "types";

type UserInitialState = {
  user?: UserLogin;
  listUser?: UserLogin[]
};

const initialState: UserInitialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserByIdThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(getListUserThunk.fulfilled, (state, { payload }) => {
        state.listUser = payload
      });
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
