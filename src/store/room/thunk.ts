import { createAsyncThunk } from "@reduxjs/toolkit";
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