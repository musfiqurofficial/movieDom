export const playerActionTypes = {
  UPDATE_VOLUME: "update_volume",
  UPDATE_PLAYER_LOADED: "update_player_loaded",
  UPDATE_CHANGING_VOLUME: "update_changing_volume",
  UPDATE_PLAYING: "update_playing",
  UPDATE_CURRENT_TIME: "update_current_time",
  UPDATE_SUBTITLE: "update_subtitle",
  UPDATE_HIDE_BAR: "update_hide_bar",
  UPDATE_PLAYER_REF: "update_player_ref",
  UPDATE_MOVIEDOM_PLAYER: "update_moviedom_player",
  UPDATE_CONTROLE_VISIBILITY_COUNT: "update_controle_visibilitu_count",
  UPDATE_SHOW_CONTROLES: "update_show_controles",
  UPDATE_MOUSE_ON_CONTROLES: "update_mouse_on_controles",
  UPDATE_SHOW_BACK_FORWORD: "u_s_b_f",
  UPDATE_SHOW_PAUSED_CONTENT: "u_s_p_c",
  UPDATE_LOADING: "u_loading",
  UPDATE_IS_ONLINE: "u_is_online",
  UPDATE_PLAYBACK_SPEED: "u_pb_speed",
  UPDATE_FIRST_TIME_PLAY: "update_first_time_play",
  UPDATE_RESUME: "update_resume_item",
  UPDATE_PERMIT_NEXT_EPI: "update_permit_next_epi",
};

export const playerStates = {
  volume: 50,
  playerLoaded: false,
  changingVolume: false,
  playing: false,
  currentTime: 0,
  subTitle: false,
  hidePlaybar: false,
  playerRef: null,
  movieDomPlayer: null,
  controleVisibilityCount: 0,
  showControles: true,
  playbackSpeed: 1,
  mouseOnControles: false,
  showPausedContent: false,
  loading: true,
  isOnline: window.navigator.isOnline,
  first_time_play: false,
  resume: false,
  permit_next_epi: false,
  showBackForward: {
    b: false,
    f: false,
  },
};

export function playerReducer(state, { type, payload }) {
  const {
    UPDATE_VOLUME,
    UPDATE_PERMIT_NEXT_EPI,
    UPDATE_PLAYER_LOADED,
    UPDATE_PLAYING,
    UPDATE_CURRENT_TIME,
    UPDATE_SUBTITLE,
    UPDATE_CHANGING_VOLUME,
    UPDATE_HIDE_BAR,
    UPDATE_PLAYER_REF,
    UPDATE_MOVIEDOM_PLAYER,
    UPDATE_CONTROLE_VISIBILITY_COUNT,
    UPDATE_SHOW_CONTROLES,
    UPDATE_MOUSE_ON_CONTROLES,
    UPDATE_SHOW_BACK_FORWORD,
    UPDATE_SHOW_PAUSED_CONTENT,
    UPDATE_LOADING,
    UPDATE_IS_ONLINE,
    UPDATE_PLAYBACK_SPEED,
    UPDATE_FIRST_TIME_PLAY,
    UPDATE_RESUME,
  } = playerActionTypes;

  switch (type) {
    case UPDATE_VOLUME: {
      return { ...state, volume: payload };
    }
    case UPDATE_PLAYER_LOADED: {
      return { ...state, playerLoaded: payload };
    }
    case UPDATE_CHANGING_VOLUME: {
      return { ...state, changingVolume: payload };
    }
    case UPDATE_PLAYING: {
      return { ...state, playing: payload };
    }
    case UPDATE_PLAYER_REF: {
      return { ...state, playerRef: payload };
    }
    case UPDATE_CURRENT_TIME: {
      return { ...state, currentTime: payload };
    }
    case UPDATE_SUBTITLE: {
      return { ...state, subTitle: payload };
    }
    case UPDATE_HIDE_BAR: {
      return { ...state, hidePlaybar: payload };
    }
    case UPDATE_MOVIEDOM_PLAYER: {
      return { ...state, movieDomPlayer: payload };
    }
    case UPDATE_CONTROLE_VISIBILITY_COUNT: {
      return { ...state, controleVisibilityCount: payload };
    }

    case UPDATE_SHOW_CONTROLES: {
      return { ...state, showControles: payload };
    }

    case UPDATE_MOUSE_ON_CONTROLES: {
      return { ...state, mouseOnControles: payload };
    }

    case UPDATE_SHOW_PAUSED_CONTENT: {
      return { ...state, showPausedContent: payload };
    }
    case UPDATE_SHOW_BACK_FORWORD: {
      return {
        ...state,
        showBackForward: { ...state.showBackForward, ...payload },
      };
    }
    case UPDATE_LOADING: {
      return {
        ...state,
        loading: payload,
      };
    }
    case UPDATE_IS_ONLINE: {
      return {
        ...state,
        isOnline: payload,
      };
    }
    case UPDATE_PLAYBACK_SPEED: {
      return {
        ...state,
        playbackSpeed: payload,
      };
    }
    case UPDATE_FIRST_TIME_PLAY:
      return {
        ...state,
        first_time_play: payload,
      };
    case UPDATE_RESUME:
      return {
        ...state,
        resume: payload,
      };
    case UPDATE_PERMIT_NEXT_EPI:
      return {
        ...state,
        permit_next_epi: payload,
      };
    default:
      return state;
  }
}
