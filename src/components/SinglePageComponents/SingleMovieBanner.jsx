import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { WindowContext } from "../../Context/WindowContextProvider";
import { getMovieTime, getServerImgPath, getTMDBimgPath } from "../../tools";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import {
  BannerTrailer,
  GetGenre,
  LogoOrTitle,
  MovieTime,
  MuteUnMuteButton,
  ServerImage,
  ShowMore,
  WatchingButton,
} from "../SmallComponents";
import { saveAs } from "file-saver";
import useLS from "../../Hook/useLS";
const saveFile = (path, fileName) => {
  const url = path?.trim()?.split(" ")?.join("%20");
  saveAs(url, `${fileName}.mp4`);
};

const loading = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const SingleMovieBanner = ({ loadingStatus, thisMovie, casts }) => {
  const { notDesktop } = useContext(WindowContext);
  // Save to mylist
  const { data, updateLSDBLIST_By_context } = useLS();
  const _exist_in_my_list = data?._my_list?.find(
    (item) => item.MovieID === thisMovie?.MovieID
  );
  const { muted } = useContext(WindowContext);
  const [trailerEnd, setTrailerEnd] = useState(false);

  return (
    <section className="banner-area movie-details-section">
      <div className="media-contents">
        <ServerImage
          src={getServerImgPath(
            thisMovie?.MovieID,
            thisMovie?.backdrops_Poster,
            "movie",
            "screen"
          )}
          type='screen'
          alt=""
          className="movie-cover media-content bg-single-page-cover"
        />
        {thisMovie?.MovieTrailer && <BannerTrailer
          trailer={thisMovie?.MovieTrailer}
          className="media-content movie-trailer"
          height="140%"
          width=" 100%"
          playing={true}
          loop={false}
          onEnded={() => setTrailerEnd(true)}
          onPlay={() => setTrailerEnd(false)}
        />}
      </div>
      <div className="details-box">
        <div
          className={`theme-container pb-4 ${
            !muted && thisMovie?.MovieTrailer && !trailerEnd ? "bg-none" : ""
          }`}
        >
          <Row
            className={`${
              !muted && thisMovie?.MovieTrailer && !trailerEnd
                ? "align-items-end"
                : "align-items-start"
            }`}
          >
            <Col
              sm={12}
              md={!notDesktop ? 8 : 0}
              className={`single-page-overview`}
            >
              <Row className="align-items-start justify-content-center justify-content-md-start">
                <Col
                  xs={8}
                  md={4}
                  className={`text-center hideable`}
                  style={{
                    width:
                      !muted && thisMovie?.MovieTrailer && !trailerEnd
                        ? "0%"
                        : "",
                  }}
                >
                  <ServerImage
                    src={getServerImgPath(
                      thisMovie?.MovieID,
                      thisMovie?.poster,
                      "movie",
                      "poster",
                      true
                    )}
                    type='poster'
                    alt=""
                    className={`poster-img  img-shadow  hideable`}
                  />
                </Col>
                <Col xs={12} md={8} className="flex-column mt-4 mt-md-0">
                  {notDesktop && (
                    <div className="my-2">
                       <WatchingButton MovieID={thisMovie?.MovieID} className="w-100"/>
                    </div>
                  )}
                  <div
                    className={` hideable ${
                      !muted && thisMovie?.MovieTrailer && !trailerEnd
                        ? "hide"
                        : ""
                    }`}
                  >
                    <ul className={`tags`}>
                      <li className="tag">
                        <i className="fas fa-tags"></i>
                      </li>
                      {<GetGenre genre={thisMovie?.MovieGenre} type="movie" />}
                    </ul>
                    <span className="movie-duration ms-3">
                      <i className="fas fa-clock me-2"></i>
                      <MovieTime time={thisMovie?.MovieRuntime} />
                    </span>
                  </div>
                  <LogoOrTitle
                    imgStyle={{
                      width: "50%",
                    }}
                    id={thisMovie?.MovieID}
                  >
                    <h2 className="movie-title">
                      {thisMovie?.MovieTitle} ({thisMovie?.MovieYear})
                    </h2>
                  </LogoOrTitle>
                  <div
                    className={`hideable ${
                      !muted && thisMovie?.MovieTrailer && !trailerEnd
                        ? "hide"
                        : ""
                    }`}
                  >
                    <ul className="config-list mt-2 mb-3">
                      <Link to={`/movies?category=${thisMovie?.MovieCategory}`}>
                        <li className="config">{thisMovie?.MovieCategory}</li>
                      </Link>
                      <Link to={`/movies?year=${thisMovie?.MovieYear}`}>
                        <li className="config">{thisMovie?.MovieYear}</li>
                      </Link>
                      <Link to={`/movies?quality=${thisMovie?.MovieQuality}`}>
                        <li className="config">{thisMovie?.MovieQuality}</li>
                      </Link>
                      <li className="config">
                        <MovieTime time={thisMovie?.MovieRuntime} />
                      </li>
                    </ul>
                    <ShowMore className="movie-des col-12 col-md-8 col-lg-6">
                      {thisMovie?.MovieStory}
                    </ShowMore>
                  </div>
                  <div className="btns">
                    <div className="action-btns">
                      <i className="me-2 action-btn far fa-thumbs-up"></i>
                      <i
                        className="me-2 action-btn"
                        onClick={() => {
                          updateLSDBLIST_By_context(
                            "_my_list",
                            thisMovie,
                            _exist_in_my_list ? "remove" : "add"
                          );
                        }}
                      >
                        {_exist_in_my_list ? (
                          <MdPlaylistAddCheck />
                        ) : (
                          <MdPlaylistAdd />
                        )}
                      </i>
                    </div>
                    <button
                      onClick={() =>
                        saveFile(
                          thisMovie?.MovieWatchLink,
                          thisMovie?.MovieTitle
                        )
                      }
                      className="btn btn-download p-2 icon-rounded-btn center"
                    >
                      <i className="fas fa-download"></i>
                    </button>
                  </div>
                </Col>
              </Row>
            </Col>
            {!notDesktop && (
              <>
                <Col
                  sm={12}
                  md={4}
                  className="content-ceneter flex-row flex-md-column"
                >
                  <div className="vieo-controle-box">
                    <Link
                      to={`/player?id=${thisMovie?.MovieID}`}
                      className="player-rounded-Button"
                      title="Play Now"
                    >
                      <i className="video-controle-button fas fa-play"></i>
                      <span className="before"></span>
                      <span className="after"></span>
                    </Link>
                  </div>
                  {thisMovie?.MovieTrailer && <MuteUnMuteButton />}
                </Col>
              </>
            )}
          </Row>
          <Row className="details-content mt-4 align-items-center">
            <Col sm={12} md={6} className="people">
              {casts.length !== 0 && (
                <>
                  <Row>
                    <Col className="justify-content-start">
                      <h3>People</h3>
                    </Col>
                    <Col className="flex-row justify-content-end">
                      <span className="actor-slider-pre">
                        <MdOutlineArrowBackIos />
                      </span>
                      <span className="actor-slider-next">
                        <MdOutlineArrowForwardIos />
                      </span>
                    </Col>
                  </Row>
                  <Swiper
                    slidesPerView={3.3}
                    spaceBetween={5}
                    pagination={{
                      clickable: true,
                    }}
                    className="cast-slider"
                    modules={[Navigation]}
                    navigation={{
                      prevEl: ".actor-slider-pre",
                      nextEl: ".actor-slider-next",
                    }}
                    breakpoints={{
                      240: {
                        slidePerView: 3.3,
                      },
                      330: {
                        slidePerView: 4.5,
                      },
                      640: {
                        slidePerView: 5.5,
                      },
                      770: {
                        slidesPerView: 6.5,
                      },
                    }}
                  >
                    {casts.map(
                      (item) =>
                        !getTMDBimgPath("w185", item?.profile_path).includes(
                          "no-poster"
                        ) && (
                          <SwiperSlide key={item.id}>
                            <Link
                              to={`/actor?cast_id=${item.id}`}
                              style={{ width: "100%" }}
                            >
                              <div className="cast-card">
                                <img
                                  src={getTMDBimgPath(
                                    "w185",
                                    item?.profile_path
                                  )}
                                  alt={item}
                                  className="cast-img"
                                />
                                <p className="cast-name">
                                  {item.original_name}
                                </p>
                              </div>
                            </Link>
                          </SwiperSlide>
                        )
                    )}
                  </Swiper>
                </>
              )}
            </Col>
            <Col sm={12} md={6} className="count_overview">
              <div className="TMDB">
                <p>IMDB</p>
                <h2 style={{ fontFamily: "arial" }}>
                  {thisMovie?.MovieRatings}
                </h2>
              </div>
              <div className="TMDB">
                <p>Run Time</p>
                <h2 style={{ fontFamily: "arial" }}>
                  {getMovieTime(thisMovie?.MovieRuntime)}
                </h2>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default SingleMovieBanner;
