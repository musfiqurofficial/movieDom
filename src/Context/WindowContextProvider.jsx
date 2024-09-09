import React from "react";
import { createContext } from "react";
import useWindow from "../Hook/useWindow";
export const WindowContext = createContext();
const WindowContextProvider = ({ children }) => {
  return (
    <WindowContext.Provider value={useWindow()}>
      {children}
    </WindowContext.Provider>
  );
};

export default WindowContextProvider;
