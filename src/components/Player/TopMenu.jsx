import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ReportIcon } from "./assets/Icon/Icons";
import { ImFolderDownload } from "react-icons/im";
import { DataContext } from "./Context/DataContext";
import { PlayerContext } from "./Context/PlayerContextProvider";
import { saveFile } from "./Player";
import PlayerButtons from "./PlayerButtons";

const TopMenu = ({ classList = {} }) => {
  const {
    updateControleVisibilityCount,
    updateShowControles,
    updateMouseOnControles,
  } = useContext(PlayerContext);
  const { resetPlayer, playerData } = useContext(DataContext);

  const navigate = useNavigate();
  return (
    <div
      className={classList.top_menu}
      onMouseEnter={() => {
        updateMouseOnControles(true);
      }}
      onMouseLeave={() => {
        updateControleVisibilityCount(0);
        updateShowControles(true);
        updateMouseOnControles(false);
      }}
    >
      <PlayerButtons
        type="button"
        classList={classList}
        onClick={() => {
          navigate(-1);
          resetPlayer();
        }}
      >
        <ArrowLeft fontSize="45px" />
      </PlayerButtons>
      <div>
        <PlayerButtons
          type="button"
          classList={classList}
          onClick={() =>
            saveFile(
              playerData?.activeItem?.video,
              playerData.isMovie
                ? playerData?.activeItem?.title
                : `${playerData?.tvShow?.TVtitle}-${playerData?.activeItem?.title}`
            )
          }
        >
          <ImFolderDownload />
        </PlayerButtons>
      </div>
    </div>
  );
};

export default TopMenu;
