import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookingServices } from "services";

export const getListBookingThunk = createAsyncThunk(
    'booking/getListBooking', async(_, {rejectWithValue}) => {
        try {
            const data = await bookingServices.getListBooking()
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)