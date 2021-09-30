import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
  name: 'counter',
  initialState: {
    listMvoie: [],
  },
  reducers: {
    getlistmoviesuccess: (state, action) => {
      state.listMvoie = action.payload;
    },
  }
});

export const { getlistmoviesuccess } = movieSlice.actions;

export default movieSlice.reducer;
