import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  username: null,
  email: null,
  uid: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
    signOutUser: (state) => {
      state.name = null;
      state.username = null;
      state.email = null;
      state.uid = null
    },
  },
});

export const { signInUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
