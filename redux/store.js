import { configureStore } from '@reduxjs/toolkit'
import signUpSlice from './slices/signUpSlice'
import logInSlice from './slices/logInSlice'
import userSlice from './slices/userSlice'
import commentSlice from './slices/commentSlice'
import loadingSlice from './slices/loadingSlice'

export const store = configureStore({
  reducer: {
    signUp: signUpSlice,
    logIn: logInSlice,
    comment: commentSlice,
    user: userSlice,
    loading: loadingSlice,
  },
})