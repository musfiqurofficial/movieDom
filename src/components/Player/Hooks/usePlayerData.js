import { useContext, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import MovieDom from "../../../api/MovieDom";
import { playerCommonObj, updateEpiTimeByEPIID } from "../playerTools";
import { PlayerContext } from "../Context/PlayerContextProvider";
import {
  initialPlayerData,
  playerDataActions,
  playerDataReducer,
} from "../reducers/playerDataReducer";

function usePlayerData() {
  const [playerData, dispatch] = useReducer(
    playerDataReducer,
    initialPlayerData
  );
  const { playerStates, updateCurrentTime } = useContext(PlayerContext);

  const [searchParams] = useSearchParams();

  function resetPlayer() {
    dispatch({
      type: playerDataActions.UPDATE_ACTIVE_ITEM,
      payload: {},
    });
  }

  function updatePlayerData(data) {
    const isMovie = data?.MovieID;
    if (isMovie) {
      // IF THE DATA IS [[-MOVIE-]]
      dispatch({
        type: playerDataActions.UPDATE_IS_MOVIE,
        payload: true,
      });
      dispatch({
        type: playerDataActions.UPDATE_ACTIVE_ITEM,
        payload: playerCommonObj(data),
      });
      dispatch({
        type: playerDataActions.UPDATE_MOVIE,
        payload: data,
      });
    } else {
      const season = searchParams.get("season");
      const episode = searchParams.get("episode");
      // IF THE DATA IS [[-TV SERIES-]]
      dispatch({
        type: playerDataActions.UPDATE_TV_SHOW,
        payload: data,
      });
      dispatch({
        type: playerDataActions.UPDATE_IS_MOVIE,
        payload: false,
      });
      MovieDom.getTVEpisodes({
        tvid: data.TVID,
      }).then((dt) => {
        if (dt.length !== 0 || dt) {
          dispatch({
            type: playerDataActions.UPDATE_TV_EPISODES,
            payload: dt,
          });
          dispatch({
            type: playerDataActions.UPDATE_ACTIVE_ITEM,
            payload: playerCommonObj({
              ...dt?.find(
                (item) =>
                  item.episode_number === episode &&
                  item.season_number === season
              ),
            }),
          });
          const activeItemIndex = dt.findIndex(
            (item) =>
              item.season_number === season && item.episode_number === episode
          );
          dispatch({
            type: playerDataActions.UPDATE_NEXT_ITEM,
            payload: playerCommonObj(dt[activeItemIndex + 1]),
          });
        } else {
          dispatch({
            type: playerDataActions.UPDATE_TV_EPISODES,
            payload: [],
          });
          dispatch({
            type: playerDataActions.UPDATE_ACTIVE_ITEM,
            payload: {},
          });
          dispatch({
            type: playerDataActions.UPDATE_NEXT_ITEM,
            payload: {},
          });
        }
      });
    }
  }

  function updateNextItem() {
    dispatch({
      type: playerDataActions.UPDATE_ACTIVE_ITEM,
      payload: {},
    });
    const nextItemIndex = playerData.tvEpisodes.findIndex(
      (item) => item?.EPIID === playerData?.nextItem?.epiId
    );
    const finalItemIndex = playerData?.tvEpisodes?.length - 1;

    if (nextItemIndex === finalItemIndex) {
      updateEpiTimeByEPIID(
        {
          TVID: playerData?.tv_show?.TVID,
          epiId: playerData?.nextItem?.epiId,
        },
        updateCurrentTime
      );
      dispatch({
        type: playerDataActions.UPDATE_ACTIVE_ITEM,
        payload: playerData.nextItem,
      });
      dispatch({
        type: playerDataActions.UPDATE_NEXT_ITEM,
        payload: null,
      });
    } else {
      updateEpiTimeByEPIID(
        {
          TVID: playerData?.tv_show?.TVID,
          epiId: playerData?.nextItem?.epiId,
        },
        updateCurrentTime
      );
      dispatch({
        type: playerDataActions.UPDATE_ACTIVE_ITEM,
        payload: playerData.nextItem,
      });
      dispatch({
        type: playerDataActions.UPDATE_NEXT_ITEM,
        payload: playerCommonObj(playerData.tvEpisodes[nextItemIndex + 1]),
      });
    }
  }

  function updateAcitveItem(dt) {
    if (playerData.isMovie) {
      dispatch({
        type: playerDataActions.UPDATE_ACTIVE_ITEM,
        payload: dt,
      });
    } else {
      const thisItemIndex = playerData.tvEpisodes.findIndex(
        (item) => item.EPIID === dt.EPIID
      );
      const lastItemIndex = playerData.tvEpisodes.length - 1;
      dispatch({
        type: playerDataActions.UPDATE_ACTIVE_ITEM,
        payload: playerCommonObj(dt),
      });
      if (thisItemIndex === lastItemIndex) {
        dispatch({
          type: playerDataActions.UPDATE_NEXT_ITEM,
          payload: null,
        });
      } else {
        dispatch({
          type: playerDataActions.UPDATE_NEXT_ITEM,
          payload: playerCommonObj(playerData.tvEpisodes[thisItemIndex + 1]),
        });
      }
    }
  }

  return {
    playerData,
    resetPlayer,
    updatePlayerData,
    updateNextItem,
    updateAcitveItem,
  };
}
export default usePlayerData;
