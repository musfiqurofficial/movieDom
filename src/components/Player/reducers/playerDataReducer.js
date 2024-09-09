export const playerDataActions = {
  UPDATE_IS_MOVIE: "u_is_m",
  UPDATE_TV_EPISODES: "u_tv_e",
  UPDATE_ACTIVE_ITEM: "u_active_item",
  UPDATE_NEXT_ITEM: "u_next_item",
  UPDATE_TV_SHOW: "u_tv_show",
  UPDATE_MOVIE: "update_movie",
};

export const initialPlayerData = {
  isMovie: true,
  tvEpisodes: [],
  activeItem: {},
  movie: {},
  nextItem: {},
  tvShow: {},
};

export function playerDataReducer(state, { type, payload }) {
  const {
    UPDATE_IS_MOVIE,
    UPDATE_TV_EPISODES,
    UPDATE_ACTIVE_ITEM,
    UPDATE_NEXT_ITEM,
    UPDATE_MOVIE,
    UPDATE_TV_SHOW,
  } = playerDataActions;

  switch (type) {
    case UPDATE_IS_MOVIE:
      return { ...state, isMovie: payload };
    case UPDATE_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: payload,
      };
    case UPDATE_MOVIE:
      return {
        ...state,
        movie: payload,
      };
    case UPDATE_NEXT_ITEM:
      return { ...state, nextItem: payload };
    case UPDATE_TV_SHOW:
      return { ...state, tvShow: payload };
    case UPDATE_TV_EPISODES:
      return {
        ...state,
        tvEpisodes: payload,
        isMovie: false,
      };
    default:
      return state;
  }
}
