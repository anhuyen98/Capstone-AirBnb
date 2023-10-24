import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getListUserThunk, getUserByIdThunk } from ".";
import { UserLogin } from "types";

type UserInitialState = {
  user?: UserLogin;
  listUser?: UserLogin[]
  isEditing?: boolean
};

const initialState: UserInitialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editingUser: (state) => {
      state.isEditing = true
    },
    cancelEditing: (state) => {
      state.isEditing = false
    },
    deleteItemListUser:(state ,{payload}: PayloadAction<number>)=>{
      // :PayloadAction<UserLogin[]>
      // state.listUser = [...payload]
      state.listUser = state.listUser.filter((user) => user.id !== payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUserByIdThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(getListUserThunk.fulfilled, (state, { payload }) => {
        state.listUser = payload
      })
      // .addCase(deleteUserThunk.fulfilled, (state, {payload}) => {
      //   state.listUser = state.listUser.filter((user) => user.id !== payload)
      // })
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
