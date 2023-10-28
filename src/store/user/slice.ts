import { createSlice } from "@reduxjs/toolkit";
import { getListUserThunk, getUserByIdThunk, updateUserByIdThunk } from ".";
import { UserLogin } from "types";

type UserInitialState = {
  user?: UserLogin;
  listUser?: UserLogin[];
  isEditing?: boolean;
  error?: string
};

const initialState: UserInitialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editingUser: (state) => {
      state.isEditing = true;
    },
    cancelEditing: (state) => {
      state.isEditing = false;
    },
    uploadAva: (state, {payload}) => {
      state.user = payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserByIdThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(getListUserThunk.fulfilled, (state, { payload }) => {
        state.listUser = payload;
      })
      .addCase(updateUserByIdThunk.fulfilled, (state, { payload }) => {
        state.listUser.map((user) => {
          if (user.id === payload.id) return payload;
          return user;
        });
      })
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
