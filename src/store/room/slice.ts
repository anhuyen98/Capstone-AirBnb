import { createSlice } from "@reduxjs/toolkit";
import { RoomType } from "types";
import { getListRoomByLocalThunk, getListRoomThunk, getRoomByIdThunk, updateRoomByIdThunk } from ".";

type RoomInitialState = {
    listRoom?: RoomType[]
    room?: RoomType
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
        .addCase(getRoomByIdThunk.fulfilled, (state, {payload}) => {
            state.room = payload
        })
        .addCase(updateRoomByIdThunk.fulfilled, (state, {payload} ) => {
            const index = state.listRoom.findIndex((room) => room.id === payload.id)
            state.listRoom[index] = payload
        })
    },
})

export const {reducer: roomReducer, actions: roomActions} = roomSlice