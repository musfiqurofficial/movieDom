import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {  img_path } from "../../../../../tools";
import { IconButton } from "../../common/buttons/Buttons";
import Image, { IMG_TYPE } from "../../helper/Image";
import { useHover } from "react-haiku";
import { WindowContext } from "../../../../../Context/WindowContextProvider";
import CardTrailer from "../../common/Trailer/CardTrailer";
import FSicon from "../../icons/FSicon";
import { LSContext } from "../../../../../Context/LSContextProvider";
import { card_hover_delay } from "../../../../../api/MovieDom";

export function get_all_page_path(dataObj, param, value) {
  if (!param) return `/${dataObj?.MovieID ? "movies" : "tv-sereis"}`;
  return `/${dataObj?.MovieID ? "movies" : "tv-sereis"}?${param}=${value}`;
}

export const Ratting = ({
  ratting = 0,
  containerStyle = {},
  containerClass = "",
}) => {
  const active_rattings = Math.round((ratting * 5) / 10) || 0;
  const disabled_rattings = 5 - active_rattings;
  return (
    <div style={{ ...containerStyle }} className={`${containerClass}`}>
      {[...Array(active_rattings)].map((_, key) => (
        <i className="fas fa-star me-1 fs-14 text-warning"></i>
      ))}
      {[...Array(disabled_rattings)].map((_, key) => (
        <i className="fas fa-star  me-1  fs-14 text-text"></i>
      ))}
    </div>
  );
};

export const video_play_delay = card_hover_delay + 600;

const CoverSlide = ({ dataObj = {} }) => {
  const {handleToggleMuted, muted } =
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
    <Card className="bg-dark mdom-card-cover w-100" ref={ref} >
      <div className="card-mead">
        <figure className="media mb-0 position-relative overflow-hidden">
          <Image type={IMG_TYPE.BACKDROP} src={img_path(dataObj)} alt="" />
          {hovered && showTrailer && (
            <CardTrailer
              muted={muted}
              trailer={dataObj?.MovieTrailer || dataObj?.TVtrailer}
              className="mdom-card-trailer"
            />
          )}
          <div className="overlap position-absolute top-0 left-0 h-100 w-100 d-flex justify-content-end align-items-start gap-2 p-3 ">
            <div className="d-flex flex-column gap-3 show-on-hover">
              <IconButton size={35} onClick={handleToggleMuted}>
                {muted ? <FSicon.MuteS /> : <FSicon.SoundR />}
              </IconButton>
              <IconButton size={35} onClick={toggle_from_list}>
                {_exist_in_my_list ? (
                  <FSicon.BookmarkS />
                ) : (
                  <FSicon.BookmarkR />
                )}
              </IconButton>
            </div>
          </div>
        </figure>
        <figure className="hide-on-hover position-absolute top-0 left-0 h-100 w-100 d-flex justify-content-between p-8 mb-0 flex-column">
          <span className="d-flex align-items-center">
            <i className="fas fa-star me-1  fs-14 text-warning"></i>
            <span className="fs-16 fw-700 text-warning">
              {dataObj?.MovieRatings || dataObj?.TVRatings}
            </span>
          </span>
          <div>
            <p className="fs-14 text-light mb-0 fw-600">
              {dataObj?.MovieTitle || dataObj?.TVtitle}
            </p>
            <figure className="d-flex flex-wrap align-items-center fs-12 mb-0">
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
            </figure>
          </div>
        </figure>
      </div>
      <Card.Body className="p-6 bg-black">
        <div className="mb-1 d-flex ">
          <div className=" flex-grow-1" s>
            <h6 className="mb-0 text-light">
              {dataObj?.MovieTitle || dataObj?.TVtitle}
            </h6>
            <figure className="mb-0">
              {(dataObj?.MovieYear || dataObj?.TVrelease) && (
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
            </figure>
          </div>
          <IconButton
            size={40}
            type="NavLink"
            to={`/${dataObj?.MovieID ? "movies" : "tv-series"}/${
              dataObj?.MovieID || dataObj?.TVID
            }`}
          >
            <i className="fas fa-play"></i>
          </IconButton>
        </div>
        <small className="desc mb-1">
          {dataObj.MovieStory || dataObj.TVstory}
        </small>
        <Ratting ratting={dataObj.MovieRatings || dataObj.TVRatings} />
      </Card.Body>
    </Card>
  );
};

export default CoverSlide;
