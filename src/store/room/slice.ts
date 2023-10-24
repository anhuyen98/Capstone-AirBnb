import { createSlice } from "@reduxjs/toolkit";
import { RoomType } from "types";
import { getListRoomByLocalThunk, getListRoomThunk } from ".";

type RoomInitialState = {
    listRoom?: RoomType[]
    listRoomByLocal?: RoomType[]
}
const initialState: RoomInitialState = {}
const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getListRoomThunk.fulfilled, (state, {payload}) => {
            state.listRoom = payload
        })
        .addCase(getListRoomByLocalThunk.fulfilled, (state, {payload}) => {
            state.listRoomByLocal = payload
        })
    },
})

export const {reducer: roomReducer, actions: roomActions} = roomSlice