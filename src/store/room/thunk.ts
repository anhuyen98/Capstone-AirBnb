import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomSchemaType } from "schema";
import { roomServices } from "services";

export const getListRoomThunk = createAsyncThunk(
    'room/getListRoom', async(_, {rejectWithValue}) => {
        try {
            const data = await roomServices.getListRoom()
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getListRoomByLocalThunk = createAsyncThunk(
    'room/getListRoomByLocal', async(mvt: number, {rejectWithValue}) => {
        try {
            const data = await roomServices.getListRoomByLocal(mvt)
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getRoomByIdThunk = createAsyncThunk(
    'room/getRoomById', async(id: number, {rejectWithValue}) => {
        try {
            const data = await roomServices.getRoomById(id)
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const postRoomThunk = createAsyncThunk(
    'room/postRoom', async(payload: RoomSchemaType, {rejectWithValue, dispatch}) => {
        try {
            const data = await roomServices.postRoom(payload)
            dispatch(getListRoomThunk())
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteRoomByIdThunk = createAsyncThunk(
    'room/deleteRoomById', async(id: number, {rejectWithValue, dispatch}) => {
        try {
            const data = await roomServices.deleteRoomById(id)
            dispatch(getListRoomThunk())
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateRoomByIdThunk = createAsyncThunk(
    'room/updateRoomById', async(payload: { id: number, dataPayLoad: RoomSchemaType}, {rejectWithValue, dispatch}) => {
        try {
            const {id, dataPayLoad} = payload
            const data = await roomServices.updateRoomById(id, dataPayLoad)
            dispatch(getListRoomThunk())
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)