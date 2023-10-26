import { createAsyncThunk } from "@reduxjs/toolkit";
import { LocationSchemaType } from "schema";
import { locationServices } from "services";

export const getListLocationThunk = createAsyncThunk(
    'location/getListLocation', async(_, {rejectWithValue}) => {
        try {
            const data = await locationServices.getListLocation()
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getLocationIdThunk = createAsyncThunk(
    'location/getLocationId', async(id: number, {rejectWithValue}) => {
        try {
            const data = await locationServices.getLocationId(id)
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
 
export const postLocationThunk = createAsyncThunk(
    'location/postLocation', async(payload: LocationSchemaType, {rejectWithValue, dispatch}) => {
        try {
            const data = await locationServices.postLocation(payload)
            dispatch(getListLocationThunk())
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const deleteLocationByIdThunk = createAsyncThunk(
    'location/deleteLocationById', async(id: number, {rejectWithValue, dispatch}) => {
        try {
            const data = await locationServices.deleteLocationById(id)
            dispatch(getListLocationThunk())
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateLocationByIdThunk = createAsyncThunk(
    'location/updateLocationById', async(payload: { id: number, dataPayLoad: LocationSchemaType}, {rejectWithValue, dispatch}) => {
        try {
            const {id, dataPayLoad} = payload
            const data = await locationServices.updateLocationById(id, dataPayLoad)
            dispatch(getListLocationThunk())
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)