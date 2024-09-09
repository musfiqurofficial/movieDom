import React from "react";
import { createContext } from "react";
import useData from "../Hook/useData";
export const DataContext = createContext();
const DataContextProvider = ({ children }) => {
  return <DataContext.Provider value={useData()}>{children}</DataContext.Provider>;
};
export default DataContextProvider;
