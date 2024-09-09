
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie: {
    genre:[],
    category: [],
    year:[],
  },
  tv: {
    genre: [],
    category: [],
    year:[]
  },
};

const menu_slice = createSlice({
  name: "menu_slice",
  initialState,
  reducers: {
    updateMovieMenu(state, { payload }) {
      return {
        ...state,
        movie: {
          ...state.movie,
          ...payload,
        },
      };
    },
    updateTvMenu(state, { payload }) {
      return {
        ...state,
        tv: {
          ...state.tv,
          ...payload,
        },
      };
    },
  },
});

export const menuSelector = (store) => store.menu;

export const { updateMovieMenu, updateTvMenu } = menu_slice.actions;
const menu_reducer = menu_slice.reducer;
export default menu_reducer;
