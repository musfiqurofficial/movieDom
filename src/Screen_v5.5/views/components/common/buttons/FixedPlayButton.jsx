import React from "react";
import FSicon from "../../icons/FSicon";

const FixedPlayButton = () => {
  return (
    <button className="fixedPlayButton">
      <span className="text">Play Now</span>
      <FSicon.Play className="icon" />
    </button>
  );
};

export default FixedPlayButton;
