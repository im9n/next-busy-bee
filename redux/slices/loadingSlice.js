import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: true,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    openLoadingScreen: (state) => {
      state.loading = true
    },
    closeLoadingScreen: (state) => {
      state.loading = false
    },
  },
})

export const { openLoadingScreen, closeLoadingScreen } = loadingSlice.actions

export default loadingSlice.reducer