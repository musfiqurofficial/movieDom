import React, { useContext } from "react";
import ReactPlayer from "react-player";
import { WindowContext } from "../../../../../Context/WindowContextProvider";

const BannerTrailer = ({
  trailer = "",
  playing = false,
  style = {},
  ...rest
}) => {
  const { muted, notDesktop, playBanner } =
    useContext(WindowContext);
  const play = playBanner && playing;
  if (notDesktop || !playBanner) return null;

  return (
    <ReactPlayer
      id="banner-trailer"
      url={`https://www.youtube.com/watch?v=${trailer}`}
      playing={play}
      muted={muted}
      config={{
        youtube: {
          playerVars: { showinfo: 0, vq: "hd720" },
        },
      }}
      style={{
        height: "120%",
        width: "120%",
        ...style,
      }}
      {...rest}
    />
  );
};

export default BannerTrailer;
