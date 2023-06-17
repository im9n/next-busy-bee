import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  name: null,
  username: null,
  uid: null,
  text: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    openComment: (state) => {
      state.open = true;
    },
    closeComment: (state) => {
      state.open = false;
    },
    setCommentDetails: (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.text = action.payload.text;
      state.uid = action.payload.uid;
    },
  },
});

export const { openComment, closeComment, setCommentDetails } = commentSlice.actions;

export default commentSlice.reducer;
