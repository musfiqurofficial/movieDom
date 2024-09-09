import { createSlice } from "@reduxjs/toolkit";
import { _STATUS } from "../../../type";

const initialState = {
  status: _STATUS.PENDING,
  account: {},
  profiles: [],
  active_profile:{}
};

const user_slice = createSlice({
  name: "user_slice",
  initialState,
  reducers: {
    _update_account(state, { payload }) {
      return { ...state, account: payload };
    },
    _update_profiles(state, { payload }) {
      return { ...state, profiles: payload };
    },
    _update_status(state, { payload }) {
      return { ...state, status: payload };
    },
  },
});

export const { _update_account, _update_profiles, _update_status } =
  user_slice.actions;
export const userSelector = (store) => store.user;
const user_reducer = user_slice.reducer;
export default user_reducer;
