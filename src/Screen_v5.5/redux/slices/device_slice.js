import { createSlice } from "@reduxjs/toolkit";

const device_slice = createSlice({
    name: 'device_slice',
    initialState: {
        is_touch_device: false,
        is_small_device: false,
        device_width: 0,
    },
    reducers: {
        update_device(state, { payload }) {
            return { ...state, ...payload };
        }
    }
});

export const { update_device } = device_slice.actions;
export const deviceSelector=store=>store.device;
const device_reducer = device_slice.reducer; 
export default device_reducer;