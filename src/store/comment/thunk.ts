import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentServices } from "services/comment";
import { CommentType } from "types";

export const getListCommentThunk = createAsyncThunk(
    'comment/getListComment', async(_, {rejectWithValue}) => {
        try {
            const data = await commentServices.getListComment()
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getListCommentByCodeRoomThunk = createAsyncThunk(
    'comment/getListCommentByCodeRoom', async(codeRoom: number, {rejectWithValue}) => {
        try {
            const data = await commentServices.getListCommentByCodeRoom(codeRoom)
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const postCommentThunk = createAsyncThunk(
    'comment/postComment', async(payload: CommentType, {rejectWithValue, dispatch}) => {
        try {
            const data = await commentServices.postComment(payload)
            dispatch(getListCommentByCodeRoomThunk(payload.maPhong))
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)