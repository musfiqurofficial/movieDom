export const ACTIONS = {
    UPDATE_MOVIES_MENU: `update_movies_menu`,
    UPDATE_TVS_MENU: `update_tvs_menu`,
  };
  
  export const initialState = {
    movies: {
      categories: [],
      genre: [],
    },
    tvs: {
      categories: [],
      genre: [],
    },
  };
  
  export function menuReducer(state, { type, property, payload }) {
    switch (type) {
      case ACTIONS.UPDATE_MOVIES_MENU: {
        return {
          ...state,
          movies: {
            ...state.movies,
            [property]: payload,
          },
        };
      }
      case ACTIONS.UPDATE_TVS_MENU: {
        return {
          ...state,
          tvs: {
            ...state.tvs,
            [property]: payload,
          },
        };
      }
      default:
        console.warn("check the actions of useReducer hook");
    }
  }
  