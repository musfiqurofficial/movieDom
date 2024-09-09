import { createSlice } from "@reduxjs/toolkit";
import { CONTENT_TYPE } from "../../../const";

export const A_TO_Z = "";

const initialState = {
  movies: {},
  tvSeries: {},
  search: "",
};

const filter_slice = createSlice({
  name: "fitler_slice",
  initialState,
  reducers: {
    updateMoviesFilter(state, { payload }) {
      return {
        ...state,
        movies: {
          ...state.movies,
          ...payload,
        },
      };
    },
    deleteMoviesFilter(state, { payload }) {
      const filter = { ...state.movies };
      delete filter[payload];
      return {
        ...state,
        movies: filter,
      };
    },
    updateTvSeriesFilter(state, { payload }) {
      return {
        ...state,
        tvSeries: {
          ...state.tvSeries,
          ...payload,
        },
      };
    },
    deleteTvSeriesFilter(state, { payload }) {
      const filter = { ...state.tvSeries };
      delete filter[payload];

      return {
        ...state,
        tvSeries: filter,
      };
    },
    updateSearch(state, { payload }) {
      return {
        ...state,
        search: payload,
      };
    },
    resetFilter(state, { payload }) {
      switch (payload) {
        case CONTENT_TYPE.MOVIES:
          return {
            ...state,
            movies: {},
          };
        case CONTENT_TYPE.TVSERIES:
          return {
            ...state,
            tvSeries: {},
          };

        default:
          return initialState;
      }
    },
  },
});

export const {
  updateMoviesFilter,
  updateTvSeriesFilter,
  deleteMoviesFilter,
  deleteTvSeriesFilter,
  updateSearch,
  resetFilter,
} = filter_slice.actions;
export const fitlerSelector = (store) => store.filter;
const filter_reducer = filter_slice.reducer;
export default filter_reducer;
