import { createSlice } from "@reduxjs/toolkit";
import { CommentType } from "types";
import { getListCommentByCodeRoomThunk, getListCommentThunk } from ".";

type initialCommentState = {
  listComment?: CommentType[];
  listCommentByCodeRoom?: CommentType[];
  comment?: CommentType;
};
const initialState: initialCommentState = {};
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListCommentThunk.fulfilled, (state, { payload }) => {
        state.listComment = payload;
      })
      .addCase(
        getListCommentByCodeRoomThunk.fulfilled,
        (state, { payload }) => {
          state.listCommentByCodeRoom = payload;
        }
      );
  },
});

export const { reducer: commentReducer, actions: commentActions } =
  commentSlice;
