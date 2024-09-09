import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { img_path } from "../../../../../tools";
import CardTrailer from "../../common/Trailer/CardTrailer";
import Image, { IMG_TYPE } from "../../helper/Image";
import { useHover } from "react-haiku";
import { useState } from "react";
import { useContext } from "react";
import { WindowContext } from "../../../../../Context/WindowContextProvider";
import FSicon from "../../icons/FSicon";
import { LSContext } from "../../../../../Context/LSContextProvider";
import { IconButton } from "../../common/buttons/Buttons";
import { get_all_page_path } from "./CoverSlide";

const ExpendSlide = ({ dataObj,backdrop }) => {
  const { handleToggleMuted, muted } =
    useContext(WindowContext);
  const { hovered, ref } = useHover();
  const [showTrailer, setShowTrailer] = useState(false);
  const { data, updateLSDBLIST_By_context } = useContext(LSContext);
  const _exist_in_my_list = data?._my_list?.find((item) =>
    dataObj.MovieID
      ? dataObj.MovieID === item.MovieID
      : dataObj.TVID === item.TVID
  );
  function toggle_from_list() {
    updateLSDBLIST_By_context(
      "_my_list",
      dataObj,
      _exist_in_my_list ? "remove" : "add"
    );
  } 
  useEffect(() => {
    if (hovered) {
      setShowTrailer(true);
    } else {
      setShowTrailer(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);
  

  return (
    <div className="mdom-card-expend" ref={ref}>
      {/* PLAY ICON */}
      <div className="play-btn-wrapper show-on-hover">
        <IconButton
          size={50}
          type="NavLink"
          to={`/${dataObj.MovieID ? "movies" : "tv-series"}/${dataObj.MovieID || dataObj.TVID
            }`}
        >
          <i className="fas fa-play "></i>
        </IconButton>
      </div>
      <Image
        src={img_path(dataObj)}
        type={IMG_TYPE.BACKDROP}
        alt="Backdrop_Image"
        className="mdom-card-img-backdrop"
      />
      <Image
        type={IMG_TYPE.POSTER}
        src={img_path(dataObj, true)}
        alt="Poster_Image"
        className="mdom-card-img-poster"
      />
      {hovered && showTrailer && (
        <CardTrailer
          muted={muted}
          trailer={dataObj?.MovieTrailer || dataObj?.TVtrailer}
          className="mdom-card-trailer"
        />
      )}

      {/* INITIAL-CONTENT */}
      <div className="mdom-card-initial-content position-absolute h-100 w-100 top-0 left-0 d-flex align-items-flex-end justify-content-flex-start"></div>
      {/* HOVER-CONTENT */}
      <div className="mdom-card-hover-content">
        <figure className="d-flex justify-content-between align-items-start p-6">
          <span className="d-flex align-items-center">
            <i className="fas fa-star me-1  fs-14 text-warning"></i>
            <span className="fs-16 fw-700 text-warning">
              {dataObj?.MovieRatings || dataObj?.TVratings || 0}
            </span>
          </span>
          <ul className="action-btns">
            <IconButton size={45} onClick={handleToggleMuted}>
              {muted ? <FSicon.MuteS /> : <FSicon.SoundS />}
            </IconButton>
            <IconButton size={45} onClick={toggle_from_list}>
              {_exist_in_my_list ? <FSicon.BookmarkS /> : <FSicon.BookmarkR />}
            </IconButton>
          </ul>
        </figure>
        <div className="mdom-card-hover-content-body">
          {/* <img src="https://image.tmdb.org/t/p/w200/sDXCCyfxqMJTXtZq8kK007B4qj3.png" alt="Logo_Image" className="mdom-card-img-logo w-40" /> */}
          <h4 className="title mb-0">
            {dataObj.MovieTitle || dataObj.TVtitle}
          </h4>
          <figure className="d-flex flex-wrap gap-10 mb-0 align-items-center">
            {(dataObj.MovieYear || dataObj.TVrelease) && (
              <>
                <NavLink
                  to={`/${dataObj.MovieID ? "movies" : "tv-series"}?year=${dataObj.MovieYear || dataObj.TVrelease
                    }`}
                  className="fs-12  mb-0 card-link"
                >
                  {dataObj.MovieYear || dataObj.TVrelease}
                </NavLink>
                |
              </>
            )}
            {(dataObj?.MovieQuality || dataObj?.TVcategory) && (
              <NavLink
                to={get_all_page_path(
                  dataObj,
                  dataObj.MovieID ? "quality" : "category",
                  dataObj?.MovieQuality || dataObj?.TVcategory
                )}
                className="fs-12  mb-0 card-link"
              >
                {dataObj?.MovieQuality || dataObj?.TVcategory}
              </NavLink>
            )}
          </figure>
          {/* <p className="desc m-0">{desc}</p> */}
        </div>
      </div>
    </div>
  );
};

export default ExpendSlide;
