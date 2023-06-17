import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
}

export const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    openSignUp: (state) => {
      state.open = true
    },
    closeSignUp: (state) => {
      state.open = false
    },
  },
})

export const { openSignUp, closeSignUp } = signUpSlice.actions

export default signUpSlice.reducer