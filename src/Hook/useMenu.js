import { useEffect, useReducer } from "react";
import MovieDom from "../api/MovieDom";
import { initialState, menuReducer, ACTIONS } from "../reducer/menuReducer";

function useMenu() {
  const [menu, dispatch] = useReducer(menuReducer, initialState);

  function updateMoviesMenu(property, dt) {
    dispatch({ type: ACTIONS.UPDATE_MOVIES_MENU, property, payload: dt });
  }
  function updateTVShowsMenu(property, dt) {
    dispatch({ type: ACTIONS.UPDATE_TVS_MENU, property, payload: dt });
  }
  useEffect(() => {
    MovieDom.getGenres("movie").then((dt) => updateMoviesMenu("genre", dt));
    MovieDom.getCategories("movie").then((dt) =>
      updateMoviesMenu("categories", dt)
    );
    MovieDom.getGenres("tv").then((dt) => updateTVShowsMenu("genre", dt));
    MovieDom.getCategories("tv").then((dt) =>
      updateTVShowsMenu("categories", dt)
    );
    MovieDom.getMenu("quality").then((dt) => {
      updateMoviesMenu("quality", dt);
      updateTVShowsMenu("quality", dt);
    });
    MovieDom.getYears("movie").then((dt) => updateMoviesMenu("years", dt.sort((a,b)=>(+b.name)-(+a.name))));
    MovieDom.getYears("movie").then((dt) => updateTVShowsMenu("years", dt.sort((a,b)=>(+b.name)-(+a.name))));
  }, []);

  return { menu, updateMoviesMenu, updateTVShowsMenu };
}

export default useMenu;
