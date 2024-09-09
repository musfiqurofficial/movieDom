import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banner: [],
  banner_loading: true,
  home_data: [],
  recent_tv: {
    title: 'Recent Tv series',
    data: []
  },
  recent_movies: {
    title: "Recent Movies",
    data: []
  }
};

const home_slice = createSlice({
  name: "home_slice",
  initialState,
  reducers: {
    updateBannerData: (state, { payload }) => {
      return {
        ...state,
        banner: payload,
      };
    },
    updateBannerStatus: (state, { payload }) => {
      return {
        ...state,
        banner_loading: payload,
      };
    },
    updateHomeData: (state, { payload }) => {
      return {
        ...state,
        home_data: [
          ...state?.home_data?.filter((ele) => ele?.name !== payload?.name),
          payload,
        ].sort((a, b) => a.id - b.id),
      };
    },
    update_recent_tv_shows: (state, { payload }) => {
      return {
        ...state,
        recent_tv: payload
      };
    },
    update_recent_movies(state, { payload }) {
      return {
        ...state,
        recent_movies: {
          ...state.recent_movies,
          data: payload
        }
      }
    }
  },
});

export const homeSelector = (store) => store.home;

export const { updateBannerData, updateBannerStatus, updateHomeData, update_recent_tv_shows,update_recent_movies } =
  home_slice.actions;
const home_reducer = home_slice.reducer;
export default home_reducer;
