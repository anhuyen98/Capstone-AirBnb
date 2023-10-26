import {createAsyncThunk} from '@reduxjs/toolkit'
import { userServices } from 'services'
import { getTokenUser } from 'utils'

export const getUserByIdThunk = createAsyncThunk(
    'user/getUserById', async(path: number,{rejectWithValue}) => {
        try {
            const token = getTokenUser()
            if (token) {
                const data = await userServices.getUserById(path)
                return data.data.content
            }

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

export const deleteUserThunk = createAsyncThunk(
    'user/deleteUser', async(payload: number, {rejectWithValue}) => {
        try {
            const data = await userServices.deleteUser(payload)
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateUserThunk = createAsyncThunk(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'user/updateUser', async(payload: any, {rejectWithValue}) => {
        try {
            const {id, dataPayLoad} = payload 
            const data = await userServices.putUser(id, dataPayLoad)
            console.log("data: ", data);
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

// export const getTokenUserThunk = createAsyncThunk(
//     'auth/getTokenUser', async(_, {rejectWithValue}) => {
//         try {
//             const data = await 
//         } catch (error) {
//             return rejectWithValue(error)
//         }
//     }
// )