import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
}

export const logInSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    openLogIn: (state) => {
      state.open = true
    },
    closeLogIn: (state) => {
      state.open = false
    },
  },
})

export const { openLogIn, closeLogIn } = logInSlice.actions

export default logInSlice.reducer