import React, { useContext } from "react";
import { WindowContext } from "../../../../../Context/WindowContextProvider";
import FSicon from "../../icons/FSicon";

const TrailerSoundBtn = () => {
  const { muted } = useContext(WindowContext);
  return <>{muted ? <FSicon.MuteS /> : <FSicon.SoundS />}</>;
};

export default TrailerSoundBtn;
