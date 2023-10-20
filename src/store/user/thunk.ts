import {createAsyncThunk} from '@reduxjs/toolkit'
import { userServices } from 'services'

export const getUserByIdThunk = createAsyncThunk(
    'user/getUserById', async(path: number,{rejectWithValue}) => {
        try {
            const data = await userServices.getUserById(path)
            return data.data.content

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getListUserThunk = createAsyncThunk(
    'user/getListUser', async(_, {rejectWithValue}) => {
        try {
            const data = await userServices.getListUser()
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)