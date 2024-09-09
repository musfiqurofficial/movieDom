import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { _HIT_ORIGIN } from "../../../../tools";
import { deviceSelector } from "../../../redux/slices/device_slice";

export const IMG_TYPE = {
  POSTER: "POSTER",
  BACKDROP: "BACKDROP",
};

const NO_BACKDROP = `${_HIT_ORIGIN}/no-poster.jpg`;
const NO_POSTER = `${_HIT_ORIGIN}/no-poster-img.jpg`;

const Image = ({ src, alt = "", type = IMG_TYPE.BACKDROP, ...rest }) => {
  const invalid_img = type === IMG_TYPE.BACKDROP ? NO_BACKDROP : NO_POSTER;
  const [url, setUrl] = useState(invalid_img);
  const device = useSelector(deviceSelector);
  useEffect(() => {
    setUrl(src);
  }, [src]);

  const apply_on_desktop = !device?.is_small_device && !device?.is_touch_device;

  const onError = () => {
    setUrl(invalid_img);
  };
  return (
    <>
      <img
        src={url}
        alt={alt}
        {...rest}
        onError={onError}
      />
    </>
  );
};

export default Image;
