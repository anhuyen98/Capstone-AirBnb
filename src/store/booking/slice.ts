import { createSlice } from "@reduxjs/toolkit";
import { BookingType } from "types";
import { getBookingByIdThunk, getListBookingThunk } from ".";

type BookingInitialState = {
  listBooking?: BookingType[];
  booking?: BookingType;
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
      .addCase(getBookingByIdThunk.fulfilled, (state, { payload }) => {
        state.booking = payload;
      });
  },
});

export const { reducer: bookingReducer, actions: bookingActions } =
  bookingSlice;
