import { createContext } from "react";
import usePlayerData from "../Hooks/usePlayerData";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => (
  <DataContext.Provider value={usePlayerData()}>
    {children}
  </DataContext.Provider>
);
export default DataContextProvider;
