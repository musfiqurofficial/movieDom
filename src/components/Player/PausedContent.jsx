import React, { useContext } from "react";
import { DataContext } from "./Context/DataContext";
import { PlayerContext } from "./Context/PlayerContextProvider";

const PausedContent = ({ classList }) => {
  const { playerData } = useContext(DataContext);
  const { playerStates } = useContext(PlayerContext);
  return !playerStates.playing && playerStates.first_time_play ? (
    <section className={classList.paused_content_section}>
      <div className={classList.paused_content_wrapper}>
        <p className={classList.message}>You're watching</p>
        <h2>{playerData?.activeItem?.title}</h2>
        <p className={classList.story}>{playerData?.activeItem?.story}</p>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default PausedContent;
