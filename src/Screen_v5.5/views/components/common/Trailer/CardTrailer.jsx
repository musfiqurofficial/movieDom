import React from "react";
import ReactPlayer from "react-player";

const CardTrailer = ({
  trailer = "",
  playing = true,
  style = {},
  muted = true,
  height = "120%",
  width = "120%",
  has_trailer = (hasTrailer) => {},
  ...rest
}) => {
  const play_trailer = trailer
    ?.split(",")
    ?.filter((item) => !!item)?.[0]
    ?.trim();
  has_trailer(!!play_trailer);
  return !!play_trailer ? (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${play_trailer}`}
      playing={playing}
      muted={muted}
      config={{
        youtube: {
          playerVars: { showinfo: 0, vq: "hd720" },
        },
      }}
      style={{
        height: height,
        width: width,
        ...style,
      }}
      {...rest}
    />
  ) : null;
};

export default CardTrailer;
