import { createSlice } from "@reduxjs/toolkit";
import { BookingType } from "types";
import { getListBookingThunk } from ".";

type BookingInitialState = {
  listBooking?: BookingType[];
};
const initialState: BookingInitialState = {};
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getListBookingThunk.fulfilled, (state, { payload }) => {
      state.listBooking = payload;
    });
  },
});

export const { reducer: bookingReducer, actions: bookingActions } =
  bookingSlice;
