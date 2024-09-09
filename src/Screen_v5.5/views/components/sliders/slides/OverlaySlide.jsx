import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LSContext } from "../../../../../Context/LSContextProvider";
import { WindowContext } from "../../../../../Context/WindowContextProvider";
import { img_path } from "../../../../../tools";
import { IconButton } from "../../common/buttons/Buttons";
import Image from "../../helper/Image";
import { useHover } from "react-haiku";
import FSicon from "../../icons/FSicon";
import CardTrailer from "../../common/Trailer/CardTrailer";
import { get_all_page_path } from "./CoverSlide";

const OverlaySlide = ({ dataObj }) => {
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
    <div
      className="mdom-card-overlay"
      ref={ref}
    >
      {/* PLAY ICON */}
      <div className="play-btn-wrapper show-on-hover">
        <IconButton
          size={40}
          type="NavLink"
          to={`/${dataObj.MovieID ? "movies" : "tv-series"}/${
            dataObj.MovieID || dataObj.TVID
          }`}
        >
          <i className="fas fa-play "></i>
        </IconButton>
      </div>

      <div className="card-overlay-media">
        <Image src={img_path(dataObj)} alt="" className="card-overlay-image" />
        {hovered && showTrailer && (
          <CardTrailer
            muted={muted}
            trailer={dataObj?.MovieTrailer || dataObj?.TVtrailer}
            className="mdom-card-trailer"
          />
        )}
      </div>
      <div className="card-overlay-content d-flex">
        <figure className="flex-grow-1 d-flex flex-column justify-content-between mb-0">
          {/* ratting */}
          <span className="fs-14 d-flex align-items-center">
            <i class="fas fa-star me-1 fs-12  text-warning "></i>
            <span className="mb-0 fw-bold text-warning ">7.8</span>
          </span>
          <div>
            <p className="fs-14 text-light mb-0 ">
              {dataObj.MovieTitle || dataObj.TVtitle}
            </p>
            <ul className="d-flex gap-10 mb-0 fs-12 align-items-center">
              {(dataObj.MovieYear || dataObj.TVrelease) && (
                <>
                  <NavLink
                    to={`/${dataObj.MovieID ? "movies" : "tv-sereis"}?year=${
                      dataObj.MovieYear || dataObj.TVrelease
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
            </ul>
          </div>
        </figure>
        <figure className="show-on-hover d-flex flex-column gap-4">
          <IconButton size={35} onClick={handleToggleMuted}>
            {muted ? (
              <FSicon.MuteS className="text-light fs-12" />
            ) : (
              <FSicon.SoundS className="text-light  fs-12" />
            )}
          </IconButton>
          <IconButton size={35} onClick={toggle_from_list}>
            {_exist_in_my_list ? (
              <FSicon.BookmarkS className="text-light  fs-12" />
            ) : (
              <FSicon.BookmarkR className="text-light  fs-12" />
            )}
          </IconButton>
        </figure>
      </div>
    </div>
  );
};

export default OverlaySlide;
