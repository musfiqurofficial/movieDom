import { useEffect, useReducer } from "react";
import MovieDom from "../api/MovieDom";
import { dataInitialState, dataReducer, ACTIONS } from "../reducer/dataReducer";


function useData() {
  const [data, dispatch] = useReducer(dataReducer, dataInitialState);

  function updatemovies(property, dt) {
    dispatch({ type: ACTIONS.UPDATE_MOVIES, property, payload: dt });
  }
  function updateTVShows(property, dt) {
    dispatch({ type: ACTIONS.UPDATE_TVS, property, payload: dt });
  }
  function updateLiveTV({ property = '', dt = [] }) {
    dispatch({ type: ACTIONS.UPDATE_LIVE_TV, property, payload: dt });
  }

  return { data, updatemovies, updateTVShows,updateLiveTV };
}

export default useData;
