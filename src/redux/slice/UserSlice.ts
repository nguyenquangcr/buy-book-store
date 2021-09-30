import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    listUser: [],
    credentials: null,
  },
  reducers: {
    getlistusersuccess: (state, action) => {
      state.listUser = action.payload;
    },
    fetchcredential: (state, action) => {
      state.credentials = action.payload;
    },
    clearcredential: state => {
      state.credentials = null;
    },
  },
});

export const {
  getlistusersuccess,
  fetchcredential,
  clearcredential,
} = userSlice.actions;

export default userSlice.reducer;
