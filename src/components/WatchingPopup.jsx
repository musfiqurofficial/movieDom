import React, { useRef, useContext, useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { getMovieTime, getS0E0, getServerImgPath, str_to_arr } from "../tools";
import ReactStars from "react-stars";
import { FavouriteListButton, Logo, ServerImage } from "./SmallComponents";
import { WindowContext } from "../Context/WindowContextProvider";
import { get_all_watching_item } from "./Player/Api/continue_watching_combination";
import MovieDom from "../api/MovieDom";
import Skeleton from "react-loading-skeleton";
import ReactPlayer from "react-player";
import { MuteUnMuteButton } from "./SmallComponents";
import { SkeletonMDOMTheme } from "./LoadingSkeleton/Loading";

const WatchingPopup = () => {
  const { watching_popup, handleWatchingPopup } = useContext(WindowContext);
  const watchingPopup = useRef(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    const all_watch_list = get_all_watching_item();
    if (all_watch_list) {
      const this_item = all_watch_list?.find(
        (item) =>
          item.MovieID === watching_popup?.id ||
          item.TVID === watching_popup?.id
      );
      this_item ? setData(this_item) : setData(null);
    }
  }, [watching_popup?.id]);

  return watching_popup.show && data ? (
    <div
      ref={watchingPopup}
      className="watching-popup"
      onClick={function (e) {
        e.target.className === watchingPopup.current.className &&
          handleWatchingPopup({ ...watching_popup, show: false });
      }}
    >
      <div className="popup-body">
        <button
          className="close-btn"
          onClick={() =>
            handleWatchingPopup({ ...watching_popup, show: false })
          }
        >
          <i className="fas fa-times"></i>
        </button>
        <PopupBanner data={data} />
        <RelatedItem data={data} />
      </div>
    </div>
  ) : (
    <></>
  );
};

const PopupBanner = ({ data = {} }) => {
  const { watching_popup, handleWatchingPopup } = useContext(WindowContext);
  return (
    <>
      <div className="popup-header">
        <div className="popup-media">
          <PopupMedia data={data} />
          <div className="popup-img-screen-overlay"></div>
        </div>
        <div className="popup-container d-flex gap-2 ">
          <Button
            onClick={() =>
              handleWatchingPopup({ ...watching_popup, show: false })
            }
            className="btn btn-primary"
            as={NavLink}
            to={`/player?id=${data?.MovieID || data?.TVID}${
              data.TVID
                ? `&season=${data?.list[0]?.s}&episode=${data?.list[0]?.e}`
                : ""
            }`}
          >
            Resume <i className="fas fa-play"></i>
          </Button>
          <FavouriteListButton
            dataObj={data?.MovieID ? data : data?.tv_show}
            className="my_list_btn"
          />
        </div>
      </div>
      <div className="popup-container mt-4">
        <Row>
          <Col xs={12} md={6} lg={8}>
            <p className="title">
              {data?.MovieTitle || data?.tv_show?.TVtitle}
            </p>
            <p className="desc">{data?.MovieStory || data?.tv_show?.TVstory}</p>
          </Col>
          <Col xs={12} md={6} lg={4}>
            {(data?.MovieRatings || data?.tv_show?.TVRatings) && (
              <ReactStars
                value={parseInt(data?.MovieRatings || data?.tv_show?.TVRatings)}
                count={10}
                edit={false}
                size={24}
                color2={"#ffd700"}
              />
            )}
            <div className="d-flex flex-column gap-1">
              <span className="tag">
                <Link
                  onClick={() =>
                    handleWatchingPopup({ ...watching_popup, show: false })
                  }
                  to={
                    data.MovieID
                      ? `/movies?category=${data?.MovieCategory}`
                      : `/tv-series?category=${data?.tv_show?.TVcategory}`
                  }
                >
                  {data?.MovieCategory || data?.tv_show?.TVcategory}
                </Link>
              </span>
              <ul className="tags">
                {data?.MovieID
                  ? data?.MovieGenre.trim()
                      .split(",")
                      .map((item) => (
                        <li className="tag" key={item}>
                          <Link
                            onClick={() =>
                              handleWatchingPopup({
                                ...watching_popup,
                                show: false,
                              })
                            }
                            to={`/movies?genre=${item}`}
                          >
                            {item}
                          </Link>
                        </li>
                      ))
                  : data?.tv_show?.TVgenre.trim()
                      .split(",")
                      .map((item) => (
                        <li className="tag" key={item}>
                          <Link
                            onClick={() =>
                              handleWatchingPopup({
                                ...watching_popup,
                                show: false,
                              })
                            }
                            to={`/tv-series?genre=${item}`}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
              </ul>
              <p className="time">
                {data?.MovieID ? (
                  getMovieTime(data?.MovieRuntime)
                ) : (
                  <>
                    <i className="fas fa-location-arrow"></i>
                    Watching : S{getS0E0(data?.list[0]?.s)}E
                    {getS0E0(data?.list[0]?.e)}
                  </>
                )}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

const PopupMedia = ({ data = {} }) => {
  const { muted } = useContext(WindowContext);
  const [trailer, setSetTrailer] = useState("");
  const [show_trailer, setShowTrailer] = useState(true);
  const trailer_ref = useRef(null);
  useEffect(() => {
    const tr =
      data?.MovieTrailer?.trim()?.split(",")[0] ||
      data?.tv_show?.TVtrailer?.trim()?.split(",")[0];
    setSetTrailer(tr);
  }, [data]);

  return (
    <>
      <ServerImage
        src={getServerImgPath(
          data?.MovieID || data?.TVID,
          data?.backdrops_Poster || data?.tv_show?.TVbackdrops,
          data?.MovieID ? "movie" : "tv",
          "screen"
        )}
        type="screen"
        className="popup-img-screen"
      />
      <Logo id={data?.MovieID || data?.TVID} className="popup-logo" />
      {show_trailer && trailer && (
        <>
          <MuteUnMuteButton />
          <ReactPlayer
            ref={trailer_ref}
            config={{
              youtube: {
                playerVars: { showinfo: 0, vq: "hd720" },
              },
            }}
            className="popup-trailer"
            url={`https://www.youtube.com/watch?vq=hd720&v=${str_to_arr(trailer,',')[0]}`}
            controls={false}
            playing={true}
            muted={muted}
            width={"100%"}
            loop={true}
            onEnded={() => {
              setShowTrailer(false);
            }}
            onPlay={() => {
              setShowTrailer(true);
            }}
            onReady={() => {
              setShowTrailer(true);
            }}
            onError={() => {
              setShowTrailer(false);
            }}
          />
        </>
      )}
    </>
  );
};

const RelatedItem = ({ data = {} }) => {
  const STATE_OPT = {
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  };
  const [status, setStatus] = useState(STATE_OPT.IDLE);
  const [relatedData, setRelatedData] = useState([]);
  const { watching_popup, handleWatchingPopup } = useContext(WindowContext);

  useEffect(() => {
    setStatus(STATE_OPT.LOADING);
    if (data?.MovieID) {
      MovieDom.getMovies({
        category: data?.MovieCategory,
      })
        .then((dt) => {
          dt = dt.filter((item) => item.MovieID !== data?.MovieID);
          if (dt.length !== 0) {
            setRelatedData(dt);
            setStatus(STATE_OPT.SUCCESS);
          } else {
            setStatus(STATE_OPT.IDLE);
          }
        })
        .catch((err) => setStatus(STATE_OPT.ERROR));
    } else if (data?.TVID) {
      MovieDom.getTVShows({
        category: data?.tv_show?.TVcategory,
      })
        .then((dt) => {
          dt = dt.filter((item) => item.TVID !== data?.TVID);
          if (dt.length !== 0) {
            setRelatedData(dt);
            setStatus(STATE_OPT.SUCCESS);
          } else {
            setStatus(STATE_OPT.IDLE);
          }
        })
        .catch((err) => setStatus(STATE_OPT.ERROR));
    }
  }, [data?.MovieID, data?.TVID]);

  return status !== STATE_OPT.IDLE && status !== STATE_OPT.ERROR ? (
    <div className="popup-container py-4">
      <p className="title">Related Item</p>
      <Row className="g-1 g-md-2 g-lg-3" xs={3} md={4}>
        {status === STATE_OPT.LOADING
          ? [...Array(6)].map((_, index) => (
              <Col key={index}>
                <SkeletonMDOMTheme>
                  <Skeleton height={320}></Skeleton>
                </SkeletonMDOMTheme>
              </Col>
            ))
          : relatedData.map((item, index) => (
              <Col key={index}>
                <Link
                  onClick={() =>
                    handleWatchingPopup({ ...watching_popup, show: false })
                  }
                  to={`/${
                    item.MovieID
                      ? `movies/${item.MovieID}`
                      : `tv-series/${item.TVID}`
                  }`}
                  style={{ width: "100%" }}
                >
                  <ServerImage
                    src={getServerImgPath(
                      item?.MovieID || item?.TVID,
                      item?.poster || item?.TVposter,
                      item?.MovieID ? "movie" : "tv",
                      "poster"
                    )}
                    type="poster"
                    style={{
                      width: "100%",
                    }}
                    className="popup-related-item-img"
                  />
                </Link>
              </Col>
            ))}
      </Row>
    </div>
  ) : (
    <></>
  );
};

export default WatchingPopup;
