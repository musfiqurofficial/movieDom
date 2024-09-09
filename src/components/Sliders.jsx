import React, { useContext, useEffect, useState } from "react";
import {
  GetGenre,
  LogoOrTitle,
  MovieTime,
  BannerTrailer,
  MuteUnMuteButton,
  ShowMore,
  WatchingButton,
  ServerImage,
} from "./SmallComponents";
import { getCommonObj, getServerImgPath } from "../tools";
import { Link } from "react-router-dom";
import { MdPlaylistAddCheck, MdPlaylistAdd } from "react-icons/md";
import useLS from "../Hook/useLS";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { WindowContext } from "../Context/WindowContextProvider";
export const HomeSlider = React.memo(({ movie }) => {
  const {
    id,
    title,
    story,
    genre,
    category,
    lang,
    quality,
    size,
    views,
    year,
    runtime,
    backdrop,
  } = getCommonObj(movie);

  const { data, updateLSDBLIST_By_context } = useLS();
  const _exist_in_my_list = data?._my_list?.find((item) =>
    movie?.TVID ? item?.TVID === movie?.TVID : item?.MovieID === movie?.MovieID
  );

  return (
    <>
      <div className="media-contents">
        <ServerImage
          src={getServerImgPath(
            id,
            backdrop,
            movie?.MovieID ? "movie" : "tv",
            "screen"
          )}
          type="screen"
          className="media-content"
          alt=""
        />
      </div>
      <div className="details-box">
        <div className="theme-container pb-4 justify-content-center">
          <div className="row">
            <div className="overview justify-content-end justify-content-md-center">
              <div>
                <ul className="tags">
                  <GetGenre movieGenre={genre} />
                </ul>
                <span className="movie-duration ms-3">
                  <i className="me-2 fas fa-clock"></i>
                  <MovieTime time={runtime} />
                </span>
              </div>

              <LogoOrTitle id={id}>
                <h2 className="movie-title">
                  {title} ({year})
                </h2>
              </LogoOrTitle>

              <ul className="config-list mt-2 mb-3">
                {category && (
                  <Link to={`/movies?category=${category}`}>
                    <li className="config">{category}</li>
                  </Link>
                )}
                {quality && (
                  <Link to={`/movies?quality=${quality}`}>
                    <li className="config">{quality}</li>
                  </Link>
                )}
                {views && (
                  <Link to={`/movies`}>
                    <li className="config">{views}</li>
                  </Link>
                )}
                {lang && (
                  <Link to={`/movies`}>
                    <li className="config">{lang}</li>
                  </Link>
                )}
                {size && (
                  <Link to={`/movies`}>
                    <li className="config">{size}</li>
                  </Link>
                )}
              </ul>
              {/* <div className="des-title">
                <h6 className="mb-0">Overview:</h6>
              </div> */}
              {story && (
                <ShowMore className="mt-1 movie-des col-12 col-md-5">
                  {story}
                </ShowMore>
              )}
              <div className="btns">
                <div className="action-btns">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-top`}>
                        {_exist_in_my_list
                          ? "Remove From My List"
                          : "Add to My List"}
                      </Tooltip>
                    }
                  >
                    <i
                      style={{
                        fontSize: "20px",
                      }}
                      onClick={() => {
                        updateLSDBLIST_By_context(
                          "_my_list",
                          movie,
                          _exist_in_my_list ? "remove" : "add"
                        );
                      }}
                      className="action-btn me-2"
                    >
                      {_exist_in_my_list ? (
                        <MdPlaylistAddCheck />
                      ) : (
                        <MdPlaylistAdd />
                      )}
                    </i>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-top`}>
                        {_exist_in_my_list ? "Unlike" : "Like"}
                      </Tooltip>
                    }
                  >
                    <i className={`me-2 action-btn far fa-thumbs-up`}></i>
                  </OverlayTrigger>

                  {/* <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-top`}>
                        {_exist_in_my_list ? "Unlike" : "Like"}
                      </Tooltip>
                    }
                  >
                    <i
                      onClick={() => handleAction("star")}
                      className={`me-2 action-btn ${
                        actions.star ? "fas" : "far"
                      } fa-star`}
                    ></i>
                  </OverlayTrigger> */}
                </div>
                <WatchingButton MovieID={movie?.MovieID} TVID={movie?.TVID} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export const FirstHomeSlider = ({ movie, sliderVideoOff }) => {
  const {
    id,
    title,
    story,
    trailer,
    genre,
    category,
    lang,
    quality,
    size,
    views,
    year,
    runtime,
    backdrop,
  } = getCommonObj(movie);
  const { muted, playBanner } = useContext(WindowContext);
  const { data, updateLSDBLIST_By_context } = useLS();
  const _exist_in_my_list = data?._my_list?.find((item) =>
    movie?.TVID ? item?.TVID === movie?.TVID : item?.MovieID === movie?.MovieID
  );

  // img show state
  const [showImg, SetShowImg] = useState(false);
  useEffect(() => {
    SetShowImg(trailer ? false : true);
  }, [trailer]);
  return (
    <>
      <div className="media-contents">
        <MuteUnMuteButton />
        <ServerImage
          src={getServerImgPath(
            id,
            backdrop,
            movie?.MovieID ? "movie" : "tv",
            "screen"
          )}
          type="screen"
          className={`media-content ${showImg ? "d-block" : "d-none"}`}
          alt=""
        />
        {!showImg && sliderVideoOff && (
          <BannerTrailer
            className="media-content"
            trailer={trailer}
            height="140vh"
            width="120%"
            onPlay={() => SetShowImg(false)}
            onEnded={() => SetShowImg(true)}
            onError={() => SetShowImg(true)}
          />
        )}
      </div>
      <div className="details-box">
        <div className="theme-container pb-4 justify-content-center">
          <div className="row">
            <div className="overview justify-content-end justify-content-md-center">
              <div>
                <ul className="tags">
                  <GetGenre movieGenre={genre} />
                </ul>
                <span className="movie-duration ms-3">
                  <i className="me-2 fas fa-clock"></i>
                  <MovieTime time={runtime} />
                </span>
              </div>

              <LogoOrTitle id={id}>
                <h2 className="movie-title">
                  {title} ({year})
                </h2>
              </LogoOrTitle>
              <div
                className="hideable"
                style={{
                  width: muted && !playBanner ? "0" : "100%",
                  height: muted && !playBanner ? "0" : "auto",
                  overflow: "hidden",
                }}
              >
                <ul className="config-list mt-2 mb-3">
                  {category && (
                    <Link to={`/movies?category=${category}`}>
                      <li className="config">{category}</li>
                    </Link>
                  )}
                  {quality && (
                    <Link to={`/movies?quality=${quality}`}>
                      <li className="config">{quality}</li>
                    </Link>
                  )}
                  {views && (
                    <Link to={`/movies`}>
                      <li className="config">{views}</li>
                    </Link>
                  )}
                  {lang && (
                    <Link to={`/movies`}>
                      <li className="config">{lang}</li>
                    </Link>
                  )}
                  {size && (
                    <Link to={`/movies`}>
                      <li className="config">{size}</li>
                    </Link>
                  )}
                </ul>
                {/* <div className="des-title">
                <h6 className="mb-0">Overview:</h6>
              </div> */}
                {story && (
                  <ShowMore className="mt-1 movie-des col-12 col-md-5">
                    {story}
                  </ShowMore>
                )}
              </div>
              <div className="btns">
                <div className="action-btns">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-top`}>
                        {_exist_in_my_list
                          ? "Remove From My List"
                          : "Add to My List"}
                      </Tooltip>
                    }
                  >
                    <i
                      style={{
                        fontSize: "20px",
                      }}
                      onClick={() => {
                        updateLSDBLIST_By_context(
                          "_my_list",
                          movie,
                          _exist_in_my_list ? "remove" : "add"
                        );
                      }}
                      className="action-btn me-2"
                    >
                      {_exist_in_my_list ? (
                        <MdPlaylistAddCheck />
                      ) : (
                        <MdPlaylistAdd />
                      )}
                    </i>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-top`}>
                        {_exist_in_my_list ? "Unlike" : "Like"}
                      </Tooltip>
                    }
                  >
                    <i className={`me-2 action-btn far fa-thumbs-up`}></i>
                  </OverlayTrigger>

                  {/* <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-top`}>
                        {_exist_in_my_list ? "Unlike" : "Like"}
                      </Tooltip>
                    }
                  >
                    <i
                      onClick={() => handleAction("star")}
                      className={`me-2 action-btn ${
                        actions.star ? "fas" : "far"
                      } fa-star`}
                    ></i>
                  </OverlayTrigger> */}
                </div>
                <WatchingButton MovieID={movie?.MovieID} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
