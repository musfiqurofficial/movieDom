import { useReducer } from "react";
import {
  initialFilters,
  filterAction,
  filterReducer,
} from "../reducer/filterReducer";
function useFilter() {
  const [filterState, dispatch] = useReducer(filterReducer, initialFilters);

  const appFilter = (payload) => {
    dispatch({
      type: filterAction.ADD,
      payload,
    });
  };
  
  const removeFilter = (payload) => {
    dispatch({
      type: filterAction.REMOVE,
      payload,
    });
  };

  return { filterState, appFilter, removeFilter };
}
export default useFilter;
