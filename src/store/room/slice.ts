import { createSlice } from "@reduxjs/toolkit";
import { RoomType } from "types";
import { getListRoomThunk } from ".";

type RoomInitialState = {
    listRoom?: RoomType[]
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
    },
})

export const {reducer: roomReducer, actions: roomActions} = roomSlice