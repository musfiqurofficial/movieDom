import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import ReactPlayer from "react-player";
import { getEpisodImg } from "../../api/getImage";
import { MainServerURL } from "../../api/MovieDom";
import { WindowContext } from "../../Context/WindowContextProvider";
import { getServerImgPath } from "../../tools";
import { DataContext } from "./Context/DataContext";
import { PlayerContext } from "./Context/PlayerContextProvider";
import { continueWatching, playBarPercentage } from "./playerTools";

const Video = ({ classList, url }) => {
  const [playerHeight, setPlayerHeight] = useState("");
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const {
    playerStates,
    updatePlaying,
    updateCurrentTime,
    updatePlayerRef,
    updateControleVisibilityCount,
    updateShowControles,
    updatePlayerLoaded,
    updateShowPausedContent,
    updateLoading,
    updateIsOnline,
    updateFirstTimePlay,
    updateResume,
    updatePermitNextEpi,
  } = useContext(PlayerContext);
  const { playerData } = useContext(DataContext);
  const playerRef = useRef(playerStates.playerRef);

  useEffect(() => {
    const track = document.querySelector("#_video_player track");
    if (track?.src) {
      track.src = playerStates.subTitle ? playerData?.activeItem?.subtitle : "";
    }
  }, [playerStates.subTitle, playerData?.activeItem?.subtitle]);

  useEffect(() => {
    updatePlayerRef(playerRef);
    // OBSERVE THE WINDOW HEIGHT CHANGE
    const observer = new ResizeObserver((entries) => {
      setPlayerHeight(entries[0].contentRect.height);
    });
    observer.observe(document.body);
  }, []);

  // CUE POSITION CHANGE WITH PLAYER CONTROLE CHNAGE
  useEffect(() => {
    if (playerStates.playerRef) {
      const cues =
        playerStates.playerRef.current?.getInternalPlayer()?.textTracks[0]
          ?.cues;
      if (cues) {
        for (let cue of cues) {
          cue.line = playerStates.showControles ? -4 : -1;
        }
      }
    }
  }, [playerStates?.playerRef, playerStates?.showControles]);
  return (
    <>
      <ReactPlayer
        ref={playerRef}
        height={playerHeight}
        playing={playerStates.playing}
        controls={false}
        volume={playerStates.volume / 100}
        url={playerData.activeItem?.video?.replace("../../../", MainServerURL)}
        className={classList.video_palyer}
        id={"_video_player"}
        playbackRate={playerStates.playbackSpeed}
        stopOnUnmount
        config={{
          file: {
            forceHLS: isSafari,
            forceVideo: true,
            tracks: [
              {
                kind: "subtitles",
                src: '',
                srcLang: "en",
                default: true,
                mode: "showing",
              },
            ],
          },
        }}
        onProgress={() => {
          updateCurrentTime(playBarPercentage(playerRef));
          if (playerStates.showControles) {
            updateControleVisibilityCount(
              playerStates.controleVisibilityCount + 1
            );
            updateShowControles(true);
          }
          if (playerStates.controleVisibilityCount > 3) {
            updateShowControles(false);
            updateControleVisibilityCount(0);
          }
          const remaining_two_s =
            playerStates?.playerRef?.current?.getDuration() -
            playerStates?.playerRef?.current?.getCurrentTime();
          // =-----------=
          remaining_two_s < 180
            ? updatePermitNextEpi(true)
            : updatePermitNextEpi(false);
        }}
        onReady={() => {
          updatePlaying(true);
          updatePlayerLoaded(true);
          updateShowPausedContent(false);
          updateShowPausedContent(false);
          updateLoading(false);
          updateIsOnline();
          continueWatching({ playerData, updateCurrentTime });
          updateFirstTimePlay(true);
          updatePermitNextEpi(false);
        }}
        onPlay={() => {
          updateLoading(false);
          updateIsOnline();
          continueWatching({ playerData, updateCurrentTime });
          updateResume(false);
        }}
        onBuffer={() => {
          updateLoading(true);
          updateIsOnline();
        }}
        onBufferEnd={() => {
          updateLoading(false);
          updateIsOnline();
        }}
        onEnded={() => {
          updateResume(true);
          updatePlaying(false);
          updateShowControles(true);
        }}
        onError={() => {
          updateLoading(true);
          updateIsOnline();
        }}
      />
      <PreCover classList={classList} />
    </>
  );
};

const PreCover = ({ classList }) => {
  const { playerData } = useContext(WindowContext);
  const { playerStates } = useContext(PlayerContext);
  return (
    <img
      src={
        playerData?.isMovie
          ? getServerImgPath(
              playerData?.activeItem?.id,
              playerData?.activeItem?.backdrop,
              "movie",
              "screen"
            )
          : getEpisodImg(
              playerData?.activeItem?.id,
              playerData?.activeItem?.s,
              playerData?.activeItem?.e,
              playerData?.activeItem?.backdrop
            )
      }
      alt=""
      className={`${classList.player_backdrop_image} ${classList.on_hide} ${
        playerStates.playerLoaded && classList.active
      }`}
    />
  );
};

export default Video;
