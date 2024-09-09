export const ACTIONS = {
  UPDATE_MOVIES: `update_movies`,
  UPDATE_TVS: `update_tvs`,
  UPDATE_LIVE_TV:'update_live_tv'
};

export const dataInitialState = {
  movies: {
    all: [],
    recent: [],
    hollywood: [],
    bollywood: [],
    animation: [],
    korean: [],
  },
  tvs: {
    all: [],
    recent: [],
    english: [],
    korean: [],
    bangla: [],
    hindi: [],
    arabic: [],
  },
  live_tv:{
    all:[],
  }
};

export function dataReducer(state, { type, property, payload }) {
  switch (type) {
    case ACTIONS.UPDATE_MOVIES: {
      return {
        ...state,
        movies: {
          ...state.movies,
          all: [...state.movies.all, ...payload],
          [property]: payload,
        },
      };
    }
    case ACTIONS.UPDATE_TVS: {
      return {
        ...state,
        tvs: {
          ...state.tvs,
          all: [...state.movies.all, ...payload],
          [property]: payload,
        },
      };
    }
    case ACTIONS.UPDATE_LIVE_TV: {
      if (property) {
        return {
          ...state,
          live_tv: {
            ...state.live_tv,
            all: [...state.live_tv.all, ...payload],
            [property]: payload,
          },
        }
      } else {
        return {
          ...state,
          live_tv: {
            ...state.live_tv,
            all: [...state?.live_tv?.all, ...payload],
          },
        }
      };
    }
    default:
      return state;
  }
}
