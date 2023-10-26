import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingSchemaType } from "schema/BookingSchema";
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

export const postBookingThunk = createAsyncThunk(
    'booking/postBooking', async(payload: BookingSchemaType, {rejectWithValue, dispatch}) => {
        try {
            const data = await bookingServices.postBooking(payload)
            dispatch(getListBookingThunk())
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getBookingByIdThunk = createAsyncThunk(
    'booking/getBookingById', async(id: number, {rejectWithValue}) => {
        try {
            const data = await bookingServices.getBookingById(id)
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const deleteBookingByIdThunk = createAsyncThunk(
    'booking/deleteBookingById', async(id: number, {rejectWithValue, dispatch}) => {
        try {
            const data = await bookingServices.deleteBookingById(id)
            dispatch(getListBookingThunk())
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateBookingByIdThunk = createAsyncThunk(
    'booking/updateBookingById', async(payload: { id: number, dataPayLoad: BookingSchemaType}, {rejectWithValue, dispatch}) => {
        try {
            const {id, dataPayLoad} = payload
            const data = await bookingServices.updateBookingById(id, dataPayLoad)
            dispatch(getListBookingThunk())
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)