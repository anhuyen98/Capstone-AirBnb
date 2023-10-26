import {createAsyncThunk} from '@reduxjs/toolkit'
import { RegisterSchemaType } from 'schema'
import { userServices } from 'services'
import { UserLogin } from 'types'
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

export const postUserThunk = createAsyncThunk(
    'user/postUser', async(payload: RegisterSchemaType, {rejectWithValue, dispatch}) => {
        try {
            const data = await userServices.postUser(payload)
            dispatch(getListUserThunk())
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const deleteUserByIdThunk = createAsyncThunk(
    'user/deleteUserById', async(id: number, {rejectWithValue, dispatch}) => {
        try {
            const data = await userServices.deleteUserById(id)
            dispatch(getListUserThunk())
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateUserByIdThunk = createAsyncThunk(
    'user/updateUserById', async(payload: { id: number, dataPayLoad: UserLogin}, {rejectWithValue, dispatch}) => {
        try {
            const {id, dataPayLoad} = payload 
            const data = await userServices.updateUserById(id, dataPayLoad)
            dispatch(getListUserThunk())
            return data.data.content
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