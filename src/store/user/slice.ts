import {createSlice} from '@reduxjs/toolkit'
import { getUserByIdThunk } from '.'
import { UserLogin } from 'types'

type UserInitialState = {
    user?: UserLogin
}

const initialState: UserInitialState = {}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUserByIdThunk.fulfilled, (state, {payload}) => {
            state.user = payload
        })
    },
})

export const {reducer: userReducer, actions: userActions} = userSlice