import React from "react";
import { NavLink } from "react-router-dom";
import { img_path } from "../../../../../tools";
import Image, { IMG_TYPE } from "../../helper/Image";

const MobileSlide = ({ dataObj, tv_backdrop }) => {
  
  return (
    <NavLink
      to={`/${dataObj?.MovieID ? "movies" : "tv-series"}/${
        dataObj?.MovieID || dataObj?.TVID
      }`}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    >
      <Image
        type={IMG_TYPE.POSTER}
        src={img_path(dataObj, !tv_backdrop)}
        alt={dataObj.title}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </NavLink>
  );
};

export default MobileSlide;
