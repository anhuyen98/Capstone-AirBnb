import { createSlice } from "@reduxjs/toolkit";
import { getListLocationThunk } from ".";
import { LocationType } from "types";

type locationInitialState = {
    listLocation?: LocationType[]
}

const initialState: locationInitialState = {}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getListLocationThunk.fulfilled, (state, {payload}) => {
            state.listLocation = payload
        })
    },
})

export const {reducer: locationReducer, actions: locationActions} = locationSlice