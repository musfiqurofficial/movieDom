import { saveAs } from "file-saver";
import React, { useContext, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { WindowContext } from "../../Context/WindowContextProvider";
import MovieDom from "../../api/MovieDom";
import {
  get_continuous_movies,
  update_continuous_movies,
} from "./Api/continue_watching_movie";
import {
  get_continuous_tv_series,
  update_continuous_tv_show,
} from "./Api/continue_watching_tv_show";
import BottomMenu from "./BottomMenu";
import { DataContext } from "./Context/DataContext";
import { PlayerContext } from "./Context/PlayerContextProvider";
import useKeyEvents from "./Hooks/useKeyEvents";
import LoadingContent from "./LoadingContent";
import NoInternetPage from "./NoInternetPage";
import PausedContent from "./PausedContent";
import PlayerButtons from "./PlayerButtons";
import TopMenu from "./TopMenu";
import Video from "./Video";
import {
  M10,
  P10,
  PauseIcon,
  PlayIcon,
  ResumeIcon,
  VolumeHigh,
  VolumeLow,
  VolumeMd,
  VolumeMuted,
} from "./assets/Icon/Icons";
import playerStyle from "./assets/scss/player.module.scss";
import {
  currentTime,
  duration,
  playerBackward,
  playerForward,
  setCurrentTime,
} from "./playerTools";
export const saveFile = (url, name) => {
  const fileExt = url.slice(url.length - 4, url.length);
  const fileName = name + fileExt;
  const link = url?.trim()?.split(" ")?.join("%20");
  saveAs(link, fileName);
};

function VolumeIcon() {
  const { playerStates } = useContext(PlayerContext);
  return (
    playerStates.changingVolume && (
      <div className={playerStyle.middle_volume}>
        {playerStates.volume >= 80 ? (
          <VolumeHigh />
        ) : playerStates.volume >= 50 ? (
          <VolumeMd />
        ) : playerStates.volume > 0 ? (
          <VolumeLow />
        ) : (
          <VolumeMuted />
        )}
        <h2 className="text-white">{playerStates.volume}%</h2>
      </div>
    )
  );
}

function MiddlePlayPauseIcon() {
  const {
    playerStates,
    updatePlaying,
    updateResume,
    updateCurrentTime,
    updateShowPausedContent,
  } = useContext(PlayerContext);
  return playerStates.playing ? (
    <span onClick={() => updatePlaying(false)}>
      <PauseIcon className={playerStyle.play_pause_fade} />
    </span>
  ) : (
    !playerStates.changingVolume && (
      <div>
        <PlayerButtons
          type="button"
          classList={playerStyle}
          className={playerStyle.middle_play_button}
          onClick={() => {
            updatePlaying(true);
            updateShowPausedContent(false);
            if (playerStates.resume) {
              updateResume(false);
              updateCurrentTime(0);
              updatePlaying(true);
            }
          }}
        >
          {playerStates.resume ? <ResumeIcon /> : <PlayIcon />}
        </PlayerButtons>
      </div>
    )
  );
}

function ScreenBackForth() {
  const { playerStates } = useContext(PlayerContext);
  return (
    <>
      {((playerStates.showControles && playerStates.first_time_play) ||
        playerStates.mouseOnControles ||
        playerStates.showBackForward.b) && (
        <div
          className={playerStyle.m10_fade}
          onClick={() => playerBackward(playerStates.playerRef)}
        >
          <M10 />
        </div>
      )}
      {((playerStates.showControles && playerStates.first_time_play) ||
        playerStates.mouseOnControles ||
        playerStates.showBackForward.f) && (
        <div
          className={playerStyle.p10_fade}
          onClick={() => playerForward(playerStates.playerRef)}
        >
          <P10 />
        </div>
      )}
    </>
  );
}

const MKVDownload = ({ classList = {}, link = "", name = "movie_dom" }) => {
  const { playerStates } = useContext(PlayerContext);
  if (!link.trim().toLowerCase().includes(".mp4") && !playerStates.playing) {
    return (
      <></>
      // <section className={classList.mkv_download}>
      //   <h3 className={classList.mkv_title}>only .mp4 is <span className={classList.mark}>Playable</span></h3>
      //   <div className={classList.download} onClick={() => saveFile(link, name)}>
      //     <span className={classList.icon}>
      //       <AiOutlineCloudDownload />
      //     </span>
      //     <div className={classList.text}>
      //       Click To Download.
      //     </div>
      //   </div>
      //   <button className="btn mt-3 mt-md-4 mt-lg-5" onClick={() => navigate(-1)}>
      //     <BiArrowBack /> Go Back
      //   </button>
      // </section>
    );
  } else {
    return <></>;
  }
};

const Player = () => {
  const {
    playerStates,
    updateMovieDomPlayer,
    updatePlaying,
    updateControleVisibilityCount,
    updateShowControles,
    updateShowPausedContent,
    updateIsOnline,
  } = useContext(PlayerContext);
  const movieDomPlayer = useRef(playerStates.movieDomPlayer);
  const { playerData, updatePlayerData } = useContext(DataContext);
  const { notDesktop } = useContext(WindowContext);
  useKeyEvents();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      MovieDom.getSingleItem({ id: id }).then((dt) => updatePlayerData(dt[0]));
    }
  }, [searchParams]);

  useEffect(() => {
    if (playerData?.activeItem?.video) {
      if (
        !playerData?.activeItem?.video?.trim()?.toLowerCase()?.includes(".mp4")
      ) {
        toast.warn(
          "This file might have a audio or video problem, if you face any kind of issue please download / report"
        );
      }
    }
  }, [playerData?.activeItem?.video]);

  // CHECK ONLINE STATUS and change orientation
  useEffect(() => {
    updateMovieDomPlayer(movieDomPlayer);
    updateIsOnline();
    window.addEventListener("online", () => {
      updatePlaying(true);
      updateIsOnline(true);
    });
    window.addEventListener("offline", () => {
      updatePlaying(false);
      updateIsOnline(false);
    });
  }, []);
  // CONTINUE WATCHING - START -------------------------

  useEffect(() => {
    if (
      playerData?.activeItem?.id &&
      playerStates.currentTime &&
      playerStates.playerRef
    ) {
      const total_min =
        new Date(duration(playerStates.playerRef)).getHours() * 60 +
        new Date(duration(playerStates.playerRef)).getMinutes();
      const current_min =
        new Date(currentTime(playerStates.playerRef)).getHours() * 60 +
        new Date(currentTime(playerStates.playerRef)).getMinutes();
      const remaining_min = total_min - current_min;
      if (playerData.isMovie) {
        update_continuous_movies(
          {
            ...playerData?.movie,
            time: playerStates.currentTime,
          },
          remaining_min
        );
        return () => {
          update_continuous_movies(
            {
              ...playerData?.movie,
              time: playerStates.currentTime,
            },
            remaining_min
          );
        };
      } else {
        update_continuous_tv_show(playerData, playerStates.currentTime);
        return () =>
          update_continuous_tv_show(playerData, playerStates.currentTime);
      }
    }
  }, [playerData, playerStates.currentTime]);
  useEffect(() => {
    if (playerData?.activeItem?.id) {
      if (playerData.isMovie) {
        const watching_movies = get_continuous_movies();
        if (watching_movies) {
          const this_watching_movie = watching_movies.find(
            (item) => item.MovieID === playerData?.activeItem?.id
          );
          if (this_watching_movie) {
            setTimeout(() => {
              setCurrentTime(playerStates.playerRef, this_watching_movie.time);
            }, 10);
          }
        }
      } else {
        const watching_tv_show = get_continuous_tv_series();
        if (watching_tv_show) {
          const this_watching_tv_show = watching_tv_show?.find(
            (item) => item?.TVID === playerData?.tvShow?.TVID
          );
          if (this_watching_tv_show) {
            const this_watching_epi = this_watching_tv_show.list?.find(
              (item) => item.epiId === playerData?.activeItem?.epiId
            );
            if (this_watching_epi) {
              setTimeout(() => {
                setCurrentTime(playerStates.playerRef, this_watching_epi.time);
              }, 10);
            }
          }
        }
      }
    }
  }, [playerData, playerStates.playerRef]);

  useEffect(() => {
    if (playerStates.playing) {
      updateShowControles(true);
    } else {
      updateShowControles(false);
    }
  }, [playerStates.playing]);

  return (
    <div
      className={playerStyle.player}
      id="__moviedom_video_player"
      ref={movieDomPlayer}
      onMouseMove={() => {
        updateControleVisibilityCount(0);
        if (playerStates.playing) {
          updateShowControles(true);
        }
      }}
    >
      <MKVDownload
        link={playerData?.activeItem?.video}
        name={playerData?.activeItem?.title}
        classList={playerStyle}
      />
      {playerStates.loading && <LoadingContent classList={playerStyle} />}

      {!playerStates.isOnline && <NoInternetPage classList={playerStyle} />}
      <Video url={playerData?.activeItem?.url} classList={playerStyle} />
      <div
        className={playerStyle.overlay}
        onClick={() => updateShowControles(true)}
      >
        {((playerStates.showControles && playerStates.first_time_play) ||
          playerStates.mouseOnControles) && <TopMenu classList={playerStyle} />}
        <PausedContent classList={playerStyle} />
        {((playerStates.showControles && playerStates.first_time_play) ||
          playerStates.mouseOnControles) && (
          <BottomMenu classList={playerStyle} />
        )}
        <ScreenBackForth />
        {((playerStates.showControles && playerStates.first_time_play) ||
          playerStates.resume ||
          playerStates.mouseOnControles) && (
          <div
            className={`${playerStyle.middle_icons}`}
            onClick={() => {
              if (!notDesktop) {
                if (playerStates.showControles) {
                  updateShowPausedContent(false);
                  updatePlaying(!playerStates.playing);
                } else {
                  updateShowControles(true);
                  updateShowPausedContent(true);
                }
              } else {
                updateShowControles(!playerStates.showControles);
                updateShowPausedContent(!playerStates.showPausedContent);
              }
            }}
          >
            <MiddlePlayPauseIcon />
            <VolumeIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
