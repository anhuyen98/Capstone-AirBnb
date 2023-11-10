import { createSlice } from "@reduxjs/toolkit";
import { BookingType } from "types";
import { getBookingByIdThunk, getListBookingByIdThunk, getListBookingThunk, updateBookingByIdThunk } from ".";

type BookingInitialState = {
  listBooking?: BookingType[];
  booking?: BookingType;
  listBookingById?: BookingType[]
};
const initialState: BookingInitialState = {};
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListBookingThunk.fulfilled, (state, { payload }) => {
        state.listBooking = payload;
      })
      .addCase(getListBookingByIdThunk.fulfilled, (state, { payload }) => {
        state.listBookingById = payload;
      })
      .addCase(getBookingByIdThunk.fulfilled, (state, { payload }) => {
        state.booking = payload;
      })
      .addCase(updateBookingByIdThunk.fulfilled, (state, {payload}) => {
        const index = state.listBooking.findIndex((booking) => booking.id === payload.id)
        state.listBooking[index] = payload
      })
  },
});

export const { reducer: bookingReducer, actions: bookingActions } =
  bookingSlice;
