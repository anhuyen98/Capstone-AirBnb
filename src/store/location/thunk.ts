import { createAsyncThunk } from "@reduxjs/toolkit";
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
 
// export const postLocationThunk = createAsyncThunk(
//     'location/postUser', async() => {
//         try {
//             const data = await
//         } catch (error) {
            
//         }
//     }
// )