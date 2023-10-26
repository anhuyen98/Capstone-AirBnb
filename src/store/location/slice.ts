import { createSlice } from "@reduxjs/toolkit";
import { getListLocationThunk, getLocationIdThunk, updateLocationByIdThunk } from ".";
import { LocationType } from "types";

type locationInitialState = {
  listLocation?: LocationType[];
  location?: LocationType;
};

const initialState: locationInitialState = {};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(getListLocationThunk.fulfilled, (state, { payload }) => {
        state.listLocation = payload;
      })
      .addCase(getLocationIdThunk.fulfilled, (state, { payload }) => {
        state.location = payload;
      })
      .addCase(updateLocationByIdThunk.fulfilled, (state, {payload}) => {
        state.listLocation.map((location) => {
          if (location.id === payload.id) return payload
          return location
        })
      })
  },
});

export const { reducer: locationReducer, actions: locationActions } =
  locationSlice;
