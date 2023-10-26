import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getListLocationThunk, getLocationIdThunk } from ".";
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
    addLocation: (state, { payload }: PayloadAction<LocationType>) => {
      state.listLocation.push(payload);
    },
    deleteLocation: (state, {payload}: PayloadAction<number>) => {
      state.listLocation = state.listLocation.filter((location) => location.id !== payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getListLocationThunk.fulfilled, (state, { payload }) => {
        state.listLocation = payload;
      })
      .addCase(getLocationIdThunk.fulfilled, (state, { payload }) => {
        state.location = payload;
      });
  },
});

export const { reducer: locationReducer, actions: locationActions } =
  locationSlice;
