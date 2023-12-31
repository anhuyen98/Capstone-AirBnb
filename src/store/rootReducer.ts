import {combineReducers} from '@reduxjs/toolkit'
import { authReducer } from './auth'
import { userReducer } from './user'
import { locationReducer } from './location'
import { roomReducer } from './room'
import { bookingReducer } from './booking'
import { commentReducer } from './comment'

export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    location: locationReducer,
    room: roomReducer,
    booking: bookingReducer,
    comment: commentReducer,
})