import React from "react";
import { createContext } from "react";
import useLS from "../Hook/useLS";
export const LSContext = createContext();
const LSContextProvider = ({ children }) => {
  return <LSContext.Provider value={useLS()}>{children}</LSContext.Provider>;
};
export default LSContextProvider;
