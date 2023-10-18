import {createAsyncThunk} from '@reduxjs/toolkit'
import { LoginSchemaType } from 'schema'
import { authServices } from 'services'
import { sleep } from 'utils'


export const authLoginThunk = createAsyncThunk(
    'auth/login', async(payload: LoginSchemaType ,{rejectWithValue}) => {
        try {
            const data = await authServices.login(payload)
            await sleep(2000) 
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
) 