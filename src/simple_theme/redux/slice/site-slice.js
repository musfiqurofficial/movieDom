import { createSlice } from "@reduxjs/toolkit";
import { _STATUS } from "../../constant";

export class Site {
  constructor(name, logo, url, logo_width) {
    this.name = name;
    this.logo = logo;
    this.url = url;
    this.logo_width = logo_width;
  }
}

const site_slice = createSlice({
  name: "site_slice",
  initialState: {
    site_loading: _STATUS.loading,
    expired: false,
    blocked: true,
    site: null,
  },
  reducers: {
    updateSite(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const {updateSite}=site_slice.actions;
const siteReducer=site_slice.reducer;
export default siteReducer;
