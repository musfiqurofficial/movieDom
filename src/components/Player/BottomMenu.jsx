import React, { useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./assets/scss/rc_slider.scss";
import PlayerButtons from "./PlayerButtons";
import NextEpisode from "./components/NextEpisode";

import {
  CC,
  ClockIcon,
  Episodes,
  M10,
  Maximize,
  Minimize,
  NextEpi,
  P10,
  PauseIcon,
  PlayIcon,
  ResumeIcon,
  VolumeHigh,
  VolumeLow,
  VolumeMd,
  VolumeMuted,
} from "./assets/Icon/Icons";
import { useState } from "react";
import SeasonEpisode from "./components/SeasonEpisode";
import { useContext } from "react";
import { PlayerContext } from "./Context/PlayerContextProvider";
import {
  getCurrentTime,
  getremainingTime,
  playerBackward,
  playerForward,
  setPlayTime,
} from "./playerTools";
import screenfull from "screenfull";
import { DataContext } from "./Context/DataContext";
import { WindowContext } from "../../Context/WindowContextProvider";

const ManageVolume = ({ classList = {} }) => {
  const { playerStates, updateVolume, updateChangingVolume, updateHideBar } =
    useContext(PlayerContext);
  const { notDesktop } = useContext(WindowContext);
  const [currentVolume, setCurrentVolume] = useState(playerStates.volume);
  const [previousVolume, setPreviousVolume] = useState(currentVolume);
  useEffect(() => {
    updateVolume(currentVolume);
  }, [currentVolume]);
  return (
    <div
      className={`${classList.volumeContent} volumeContent`}
      onMouseEnter={() => {
        if (!notDesktop) {
          updateChangingVolume(true);
          updateHideBar(true);
        }
      }}
      onMouseLeave={() => {
        if (!notDesktop) {
          updateChangingVolume(false);
          updateHideBar(false);
        }
      }}
    >
      {playerStates.changingVolume && (
        <Slider
          min={0}
          max={100}
          vertical
          value={playerStates.volume}
          onChange={(e) => {
            setCurrentVolume((state) => {
              if (state === 100 && e === 0) {
                return 100;
              } else {
                return e;
              }
            });
          }}
        />
      )}
      <PlayerButtons
        type="button"
        classList={classList}
        onClick={() => {
          if (!notDesktop) {
            setPreviousVolume(currentVolume);
            setCurrentVolume((state) => (state ? 0 : previousVolume));
          } else {
            updateChangingVolume(!playerStates.changingVolume);
            updateHideBar(!playerStates.hidePlaybar);
          }
        }}
      >
        {currentVolume === 0 || playerStates.volume === 0 ? (
          <VolumeMuted />
        ) : (currentVolume || playerStates.volume) >= 80 ? (
          <VolumeHigh />
        ) : (currentVolume || playerStates.volume) >= 50 ? (
          <VolumeMd />
        ) : (
          <VolumeLow />
        )}
      </PlayerButtons>
    </div>
  );
};

const ManageVidoePlay = ({ classList = {} }) => {
  const {
    playerStates,
    updatePlaying,
    updateResume,
    updateCurrentTime,
    updateShowPausedContent,
  } = useContext(PlayerContext);
  return (
    <PlayerButtons
      type="button"
      classList={classList}
      onClick={() => {
        updatePlaying(true);
        updateShowPausedContent(false);
        if (playerStates.resume) {
          updateResume(false);
          updateCurrentTime(0);
          updatePlaying(true);
        } else {
          updatePlaying(!playerStates.playing);
        }
      }}
    >
      {!playerStates.resume ? (
        !playerStates.playing ? (
          <PlayIcon />
        ) : (
          <PauseIcon />
        )
      ) : (
        <ResumeIcon />
      )}
    </PlayerButtons>
  );
};

const ManageScreenSize = ({ classList = {} }) => {
  const { playerStates } = useContext(PlayerContext);
  const getCurrentWidth = () => {};
  getCurrentWidth();

  return (
    <PlayerButtons
      type="button"
      classList={classList}
      onClick={() => {
        screenfull.toggle(playerStates.movieDomPlayer.current.current);
      }}
    >
      {screenfull.isFullscreen ? <Minimize /> : <Maximize />}
    </PlayerButtons>
  );
};

const ManageCC = ({ classList = {} }) => {
  const { playerStates, updateSubtitle } = useContext(PlayerContext);
  const { playerData } = useContext(DataContext);

  if (playerData?.activeItem?.subtitle) {
    return (
      <PlayerButtons
        type="button"
        classList={classList}
        onClick={() => updateSubtitle(!playerStates.subTitle)}
      >
        <CC
          style={{
            opacity: playerStates.subTitle ? 1 : 0.4,
          }}
        />
      </PlayerButtons>
    );
  } else {
    return <></>;
  }
};

const Playbar = ({ classList }) => {
  const { playerStates } = useContext(PlayerContext);
  return (
    !playerStates.hidePlaybar && (
      <div className={classList.video_thumb_area}>
        <span className="video_time">
          {playerStates.playerRef && getCurrentTime(playerStates.playerRef)}
        </span>
        <Slider
          min={0}
          max={100}
          step={0.01}
          value={playerStates.currentTime}
          onChange={(barValue) => setPlayTime(playerStates.playerRef, barValue)}
          className={classList.video_slider}
        />
        <span className="video_time">
          -{playerStates.playerRef && getremainingTime(playerStates.playerRef)}
        </span>
      </div>
    )
  );
};

const PlayList = ({ classList }) => {
  const { updateHideBar } = useContext(PlayerContext);
  const { notDesktop } = useContext(WindowContext);
  const [showList, setShowList] = useState(false);

  const handleShowList = (state) => setShowList(state);

  return (
    <div
      className={classList.playList}
      onMouseEnter={() => {
        if (!notDesktop) {
          updateHideBar(true);
          setShowList(true);
        }
      }}
      onMouseLeave={() => {
        if (!notDesktop) {
          updateHideBar(false);
          setShowList(false);
        }
      }}
    >
      {showList && (
        <SeasonEpisode classList={classList} handleShowList={handleShowList} />
      )}

      <PlayerButtons
        type="button"
        classList={classList}
        onClick={() => {
          setShowList((state) => !state);
        }}
      >
        <Episodes />
      </PlayerButtons>
    </div>
  );
};

const NextEpisodeArea = ({ classList }) => {
  const { playerStates, updateHideBar } = useContext(PlayerContext);
  const { playerData, updateNextItem } = useContext(DataContext);
  const { notDesktop } = useContext(WindowContext);
  const [show, setShow] = useState(false);

  return (
    <div
      className={classList.nextEpisodeArea}
      onMouseEnter={() => {
        updateHideBar(true);
        setShow(true);
      }}
      onMouseLeave={() => {
        updateHideBar(false);
        setShow(false);
      }}
    >
      {(show || playerStates.permit_next_epi) &&
        !notDesktop &&
        playerData.nextItem && <NextEpisode classList={classList} />}
      <PlayerButtons
        type="button"
        classList={classList}
        onClick={() => updateNextItem()}
      >
        <NextEpi />
      </PlayerButtons>
    </div>
  );
};

const PlayBackSpeed = ({ classList = {} }) => {
  const { playerStates, updateHideBar, updatePlaybackSpeed } =
    useContext(PlayerContext);
  const [show, setShow] = useState(false);
  return (
    <div
      className={classList.playBackSpeed_area}
      onClick={() => {
        setShow((state) => !state);
        updateHideBar(!show);
      }}
    >
      {show && (
        <div className={classList.speed_slider_wrapper}>
          <h4>Playback Speed</h4>
          <Slider
            dots
            min={0.5}
            max={1.5}
            step={0.25}
            defaultValue={playerStates.playbackSpeed}
            value={playerStates.playbackSpeed}
            marks={{
              0.5: "0.5X",
              0.75: "0.75X",
              1: <b>1X</b>,
              1.25: "1.25X",
              1.5: "1.5X",
            }}
            onChange={(e) => updatePlaybackSpeed(e)}
            className={classList.play_back_speed_slider}
          />
        </div>
      )}
      <PlayerButtons type="button" classList={classList}>
        <ClockIcon />
      </PlayerButtons>
    </div>
  );
};

const BottomMenu = ({ classList = {} }) => {
  const {
    playerStates,
    updateMouseOnControles,
    updateControleVisibilityCount,
    updateShowControles,
  } = useContext(PlayerContext);
  const { playerData } = useContext(DataContext);

  return (
    <div
      className={classList.bottom_menu}
      onMouseEnter={() => {
        updateControleVisibilityCount(0);
        updateShowControles(true);
        updateMouseOnControles(true);
      }}
      onMouseLeave={() => {
        updateControleVisibilityCount(0);
        updateShowControles(true);
        updateMouseOnControles(false);
      }}
    >
      {/* Slider part */}
      <Playbar classList={classList} />
      {/* Controller Part */}
      <div className={classList.player_controll}>
        {/* ----PART 1---- */}
        <div className={classList.part_1}>
          <ManageVidoePlay classList={classList} />
          <PlayerButtons
            type="button"
            classList={classList}
            onClick={() => playerBackward(playerStates.playerRef)}
          >
            <M10 />
          </PlayerButtons>
          <PlayerButtons
            type="button"
            classList={classList}
            onClick={() => playerForward(playerStates.playerRef)}
          >
            <P10 />
          </PlayerButtons>
          <ManageVolume classList={classList} />
        </div>
        <p className={classList.title}>
          {!playerData.isMovie && (
            <>
              S{playerData?.activeItem?.s}E{playerData?.activeItem?.e}.
            </>
          )}{" "}
          {playerData?.activeItem?.title}
        </p>
        {/* ----PART 2---- */}
        <div className={classList.part_2}>
          <PlayBackSpeed classList={classList} />
          {!playerData.isMovie && (
            <>
              {playerData.nextItem && <NextEpisodeArea classList={classList} />}
              <PlayList classList={classList} />
            </>
          )}
          <ManageCC classList={classList} />
          <ManageScreenSize classList={classList} />
        </div>
      </div>
    </div>
  );
};

export default BottomMenu;
