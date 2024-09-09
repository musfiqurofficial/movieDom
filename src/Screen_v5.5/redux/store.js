import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import card_slice_reducer from "../../simple_theme/redux/slice/card-slice";
import device_reducer from "./slices/device_slice";
import filter_reducer from "./slices/filter_slice";
import home_reducer from "./slices/home_slice";
import menu_reducer from "./slices/menu_slice";
import user_reducer from "./slices/user_slice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["device", "user",'filter','home','menu'],
};
const rootReducer = combineReducers({
  device: device_reducer,
  user: user_reducer,
  menu: menu_reducer,
  filter: filter_reducer,
  home:home_reducer,
  card:card_slice_reducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});

export default store;
