import { createContext } from "react";
import useFilter from "../Hook/useFilter";

export const FilterContext = createContext();
const FilterContextProvider = ({ children }) => {
  return (
    <FilterContext.Provider value={useFilter()}>
      {children}
    </FilterContext.Provider>
  );
};
export default FilterContextProvider;
