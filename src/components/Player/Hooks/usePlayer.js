import { useReducer } from "react";
import {
  playerActionTypes,
  playerReducer,
  playerStates,
} from "../reducers/playerReducer";

export default function usePlayer() {
  const [states, dispatch] = useReducer(playerReducer, playerStates);
  function updateVolume(value) {
    dispatch({
      type: playerActionTypes.UPDATE_VOLUME,
      payload: value,
    });
  }
  function updatePlayerRef(value) {
    dispatch({
      type: playerActionTypes.UPDATE_PLAYER_REF,
      payload: value,
    });
  }
  function updatePlaying(payload) {
    dispatch({
      type: playerActionTypes.UPDATE_PLAYING,
      payload,
    });
  }
  function updateCurrentTime(value) {
    dispatch({
      type: playerActionTypes.UPDATE_CURRENT_TIME,
      payload: value,
    });
  }
  function updateSubtitle(value) {
    dispatch({
      type: playerActionTypes.UPDATE_SUBTITLE,
      payload: value,
    });
  }
  function updateChangingVolume(value) {
    dispatch({
      type: playerActionTypes.UPDATE_CHANGING_VOLUME,
      payload: value,
    });
  }

  function updateHideBar(value = false) {
    dispatch({
      type: playerActionTypes.UPDATE_HIDE_BAR,
      payload: value,
    });
  }

  function updateMovieDomPlayer(value) {
    dispatch({
      type: playerActionTypes.UPDATE_MOVIEDOM_PLAYER,
      payload: value,
    });
  }

  function updateControleVisibilityCount(value) {
    dispatch({
      type: playerActionTypes.UPDATE_CONTROLE_VISIBILITY_COUNT,
      payload: value,
    });
  }

  function updateShowControles(value) {
    dispatch({
      type: playerActionTypes.UPDATE_SHOW_CONTROLES,
      payload: value,
    });
  }

  function updateMouseOnControles(value) {
    dispatch({
      type: playerActionTypes.UPDATE_MOUSE_ON_CONTROLES,
      payload: value,
    });
  }

  function updateShowBackForth(property, value) {
    dispatch({
      type: playerActionTypes.UPDATE_SHOW_BACK_FORWORD,
      payload: {
        [property]: value,
      },
    });
  }

  function updatePlayerLoaded(value) {
    dispatch({
      type: playerActionTypes.UPDATE_PLAYER_LOADED,
      payload: value,
    });
  }

  function updateShowPausedContent(value) {
    dispatch({
      type: playerActionTypes.UPDATE_SHOW_PAUSED_CONTENT,
      payload: value,
    });
  }

  function updateLoading(value) {
    dispatch({
      type: playerActionTypes.UPDATE_LOADING,
      payload: value,
    });
  }

  function updateIsOnline(value = window.navigator.onLine) {
    dispatch({
      type: playerActionTypes.UPDATE_IS_ONLINE,
      payload: value,
    });
  }
  function updatePlaybackSpeed(value) {
    dispatch({
      type: playerActionTypes.UPDATE_PLAYBACK_SPEED,
      payload: value,
    });
  }
  function updateActiveCC(value) {
    dispatch({
      type: playerActionTypes.UPDATE_ACTIVE_CC,
      payload: value,
    });
  }

  function updateFirstTimePlay(payload) {
    dispatch({
      type: playerActionTypes.UPDATE_FIRST_TIME_PLAY,
      payload,
    });
  }

  function updateResume(payload) {
    dispatch({
      type: playerActionTypes.UPDATE_RESUME,
      payload,
    });
  }

  function updatePermitNextEpi(payload) {
    dispatch({
      type: playerActionTypes.UPDATE_PERMIT_NEXT_EPI,
      payload,
    });
  }

  return {
    playerStates: states,
    updateVolume,
    updatePlaying,
    updateCurrentTime,
    updateSubtitle,
    updatePermitNextEpi,
    updateChangingVolume,
    updatePlayerRef,
    updateHideBar,
    updateMovieDomPlayer,
    updateControleVisibilityCount,
    updateShowControles,
    updateMouseOnControles,
    updateShowBackForth,
    updatePlayerLoaded,
    updateShowPausedContent,
    updateLoading,
    updateIsOnline,
    updatePlaybackSpeed,
    updateActiveCC,
    updateFirstTimePlay,
    updateResume,
  };
}
