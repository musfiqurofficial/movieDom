import { useContext } from "react";
import screenfull from "screenfull";
import { PlayerContext } from "../Context/PlayerContextProvider";
import { playerBackward, playerForward } from "../playerTools";

export default function useKeyEvents() {
  const {
    playerStates,
    updatePlaying,
    updateVolume,
    updateChangingVolume,
    updateShowBackForth,
    updateShowPausedContent,
  } = useContext(PlayerContext);

  window.onkeydown = (event) => {
    let key = event.code;
    switch (key) {
      case "Space":
        updatePlaying(!playerStates.playing);
        playerStates.playing
          ? updateShowPausedContent(true)
          : updateShowPausedContent(false);
        break;
      case "ArrowRight":
        playerForward(playerStates.playerRef);
        updateShowBackForth("f", true);
        break;
      case "ArrowLeft":
        playerBackward(playerStates.playerRef);
        updateShowBackForth("b", true);
        break;
      case "ArrowDown":
        updateChangingVolume(true);
        playerStates.volume === 0
          ? updateVolume(0)
          : updateVolume(playerStates.volume - 1);
        break;
      case "ArrowUp":
        updateChangingVolume(true);
        playerStates.volume === 100
          ? updateVolume(100)
          : updateVolume(playerStates.volume + 1);
        break;
      case "KeyF":
        screenfull.toggle(playerStates.movieDomPlayer.current.current);
        break;
      case "KeyM":
        playerStates.volume ? updateVolume(0) : updateVolume(50);
        updateChangingVolume(true);
        break;
      default:
        return;
    }
  };

  window.onkeyup = (event) => {
    let key = event.code;
    switch (key) {
      case "KeyM":
        updateChangingVolume(false);
        break;
      case "ArrowRight":
        playerForward(playerStates.playerRef);
        updateShowBackForth("f", false);
        break;
      case "ArrowLeft":
        playerBackward(playerStates.playerRef);
        updateShowBackForth("b", false);
        break;
      case "ArrowDown":
        updateChangingVolume(false);
        playerStates.volume === 0
          ? updateVolume(0)
          : updateVolume(playerStates.volume - 1);
        break;
      case "ArrowUp":
        updateChangingVolume(false);
        playerStates.volume === 100
          ? updateVolume(100)
          : updateVolume(playerStates.volume + 1);
        break;
      default:
        return;
    }
  };
}
