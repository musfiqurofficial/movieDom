import React, { useContext, useRef, useState } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import ReactPlayer from "react-player/youtube";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { WindowContext } from "../Context/WindowContextProvider";
import useLS from "../Hook/useLS";
import { card_hover_delay, show_card_bottom_elm } from "../api/MovieDom";
import { _HIT_ORIGIN } from "../const";
import {
  getCommonObj,
  getServerImgPath,
  str_to_arr,
  titleRoute,
} from "../tools";
import {
  FavouriteListButton,
  Logo,
  LogoOrTitle,
  MovieTime,
  MuteUnMuteButton,
  PlayButton,
  ServerImage,
  Trailer,
} from "./SmallComponents";

const video_play_delay = card_hover_delay + 600;

const BottomMovTVYeas = ({ dataObj = {} }) => {
  return (dataObj.MovieID ||
    dataObj.TVid ||
    dataObj.MovieYear ||
    dataObj.TVrelease) &&
    show_card_bottom_elm ? (
    <div className="bottom-box">
      {(dataObj.MovieID || dataObj.TVrelease) && (
        <span className="mov-tv">{dataObj.MovieID ? "MOV" : "TV"}</span>
      )}
      {(dataObj.MovieYear || dataObj.TVrelease) && (
        <span className="year">{dataObj.MovieYear || dataObj.TVrelease} </span>
      )}
    </div>
  ) : (
    <></>
  );
};

/**
 * --------------------------
 * -----Hover Video Play------
 * --------------------------
 */

export const HoverVideoCard = ({ dataObj }) => {
  const {
    id,
    title,
    trailer,
    story,
    year,
    runtime,
    poster,
    ratting,
    category,
    backdrop,
  } = getCommonObj(dataObj);
  const [hoverCard, setHoverCard] = useState(false);
  const { MovieID } = dataObj;
  const hoverRef = useRef(null);
  const { handlePlayBanner } = useContext(WindowContext);
  const { data, updateLSDBLIST_By_context } = useLS();
  const _exist_in_my_list = data?._my_list?.find((item) =>
    dataObj.TVID
      ? item.TVID === dataObj.TVID
      : item.MovieID === dataObj?.MovieID
  );

  return (
    <>
      <div
        className="poster-card card"
        onMouseEnter={() => {
          handlePlayBanner(false);
          hoverRef.current = setTimeout(() => {
            setHoverCard(true);
          }, video_play_delay);
        }}
        onMouseLeave={() => {
          clearInterval(hoverRef.current);
          setHoverCard(false);
          handlePlayBanner(true);
        }}
      >
        <PlayButton
          to={`/${MovieID ? "movies" : "tv-series"}/${titleRoute(id)}`}
        />
        <div className={`poster-box`}>
          {/* <MovieImg type="backdrop" src={backdrop} className={`poster-cover`} /> */}
          <ServerImage
            src={getServerImgPath(id, backdrop, "tv", "screen", true)}
            alt=""
            type="screen"
            className="poster-cover ratio-backdrop"
          />
          <ServerImage
            src={getServerImgPath(id, poster, "tv", "poster", true)}
            alt=""
            type="poster"
            className="poster-img ratio-poster"
          />
        </div>
        <div className={`poster-expanded-box`}>
          {hoverCard && trailer && (
            <Trailer trailer={trailer} className="poster-video" />
          )}
          <div className="hover-content">
            <div className={`poster-details`}>
              {ratting && (
                <div className={`poster-ratting text-light`}>
                  <i className="fas fa-star"></i> {ratting}
                </div>
              )}
              <div className={`poster-short-details`}>
                <LogoOrTitle id={id} imgStyle={{ maxWidth: "50%" }}>
                  <div className="poster-movie-name text-white">
                    {title} ({year})
                  </div>
                </LogoOrTitle>
                <div className={`poster-dateline`}>
                  <span>{category}</span>
                  <span>{year}</span>
                  <MovieTime time={runtime} />
                </div>
                <div
                  className={`poster-movie-short-description text-in-1 text-white-lt`}
                >
                  {story}
                </div>
              </div>
            </div>
            <ul className="poster-action-btns">
              <li>
                <OverlayTrigger
                  placement="left"
                  overlay={
                    <Tooltip id={`tooltip-top`}>
                      {_exist_in_my_list
                        ? "Remove from My List"
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
                        dataObj,
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
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger
                  placement="left"
                  overlay={<Tooltip id={`tooltip-top`}>Like</Tooltip>}
                >
                  <i className="fas fa-thumbs-up"></i>
                </OverlayTrigger>
              </li>
              <li className={`poster-sound-controller`}>
                <MuteUnMuteButton placement="left" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <BottomMovTVYeas dataObj={dataObj} />
    </>
  );
};

/**
 * landscape Card
 */

export const LandScapeCard = ({ dataObj }) => {
  const { MovieID } = dataObj;
  const { id, title, story, year, trailer, category, rating, backdrop } =
    getCommonObj(dataObj);
  const [hoverCard, setHoverCard] = useState(false);
  const hoverRef = useRef(null);
  const { handlePlayBanner } = useContext(WindowContext);

  const { data, updateLSDBLIST_By_context } = useLS();
  const _exist_in_my_list = data?._my_list?.find((item) =>
    dataObj.TVID
      ? item.TVID === dataObj?.TVID
      : item.MovieID === dataObj?.MovieID
  );

  return (
    <>
      <div
        className={`post-item card tranding-item`}
        onMouseEnter={() => {
          handlePlayBanner(false);
          hoverRef.current = setTimeout(() => {
            setHoverCard(true);
          }, video_play_delay);
        }}
        onMouseLeave={() => {
          clearInterval(hoverRef.current);
          setHoverCard(false);
          handlePlayBanner(true);
        }}
      >
        <PlayButton
          to={`/${MovieID ? "movies" : "tv-series"}/${titleRoute(id)}`}
        />
        <div className={`item-thumb`}>
          <ServerImage
            src={getServerImgPath(id, backdrop, "movie", "cover")}
            alt=""
            type="screen"
            className="media-content landscape-card-img ratio-backdrop"
          />
          {/* <MovieImg
          className="landscape-card-img"
          type="backdrop"
          src={backdrop}
          alt="Movie backdrop"
        /> */}
          <div className="media-content">
            {trailer && hoverCard && (
              <Trailer trailer={trailer} className="landscape-card-video" />
            )}
          </div>
          <div className="hover-content">
            <div className="box-1">
              <div className="ratting-box">
                <span className="poster-ratting">
                  <i className="fas fa-star"></i>
                  {rating}
                </span>
              </div>
              <div className="details">
                <LogoOrTitle id={id} imgStyle={{ maxWidth: "50%" }}>
                  <p className="movie-title">{title}</p>
                </LogoOrTitle>
                <div className="poster-dateline">
                  <span className="span">{category}</span>
                  <span className="span">{year}</span>
                </div>
                <p className="movie-story text-in-2">{story}</p>
              </div>
            </div>
            <div className="box-2">
              <ul className="poster-action-btns">
                <li>
                  <i
                    style={{
                      fontSize: "20px",
                    }}
                    onClick={() => {
                      updateLSDBLIST_By_context(
                        "_my_list",
                        dataObj,
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
                </li>
                <li>
                  <i className="fas fa-thumbs-up"></i>
                </li>
                <li>
                  <MuteUnMuteButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BottomMovTVYeas dataObj={dataObj} />
    </>
  );
};

/**
 * Potrait
 */

export const Portrait = React.memo(({ dataObj }) => {
  const { id, poster, title, year, trailer, rating } = getCommonObj(dataObj);
  const { MovieID } = dataObj;
  const [hoverCard, setHoverCard] = useState(false);
  const hoverRef = useRef(null);
  const { handlePlayBanner } = useContext(WindowContext);

  const { data, updateLSDBLIST_By_context } = useLS();
  const _exist_in_my_list = data?._my_list?.find((item) =>
    dataObj.TVID
      ? item.TVID === dataObj?.TVID
      : item.MovieID === dataObj?.MovieID
  );

  return (
    <>
      <div
        className={`viewed-item viewed-slider post-item vertical-card card`}
        onMouseEnter={() => {
          hoverRef.current = setTimeout(() => {
            setHoverCard(true);
          }, video_play_delay);
        }}
        onMouseLeave={() => {
          clearInterval(hoverRef.current);
          setHoverCard(false);
        }}
      >
        {rating && (
          <div className="poster-ratting text-warning">
            <i className="fas fa-star text-warning"></i> {rating}
          </div>
        )}
        <ul className="poster-action-btns">
          <li>
            <i
              style={{
                fontSize: "20px",
              }}
              onClick={() => {
                updateLSDBLIST_By_context(
                  "_my_list",
                  dataObj,
                  _exist_in_my_list ? "remove" : "add"
                );
              }}
            >
              {_exist_in_my_list ? <MdPlaylistAddCheck /> : <MdPlaylistAdd />}
            </i>
          </li>
          <li>
            <i className="fas fa-thumbs-up"></i>
          </li>
          <li>
            <MuteUnMuteButton />
          </li>
        </ul>
        <div className={`item-thumb`}>
          <ServerImage
            src={getServerImgPath(
              id,
              poster,
              dataObj?.MovieID ? "movie" : "tv",
              "poster",
              true
            )}
            type="poster"
            alt=""
            className="ratio-poster"
          />
          <PlayButton
            to={`/${MovieID ? "movies" : "tv-series"}/${titleRoute(id)}`}
          />
          {hoverCard && trailer && (
            <Trailer trailer={trailer} className="vertical-card-video" />
          )}
          <div className="hover-content">
            <div className="poster-details">
              <h4 className="text-light title dotted-text">
                {title} ({year})
              </h4>
              {/* <LogoOrTitle id={id} imgStyle={{ maxWidth: "50%" }}>
             <h4 className="text-light title dotted-text">
                {title} ({year})
              </h4>
            </LogoOrTitle> */}
            </div>
          </div>
        </div>
      </div>
      <BottomMovTVYeas dataObj={dataObj} />
    </>
  );
});

//?=== Search Poster Card Start===?//
export function PosterCard({ dataObj }) {
  const { MovieID } = dataObj;
  const { title, id, year, poster } = getCommonObj(dataObj);
  return (
    <>
      <Link to={`/${MovieID ? "movies" : "tv-series"}/${titleRoute(id)}`}>
        <div className="poster-card card">
          <PlayButton
            to={`/${MovieID ? "movies" : "tv-series"}/${titleRoute(id)}`}
          />
          <ServerImage
            src={getServerImgPath(
              id,
              poster,
              dataObj?.MovieID ? "movie" : "tv",
              "poster",
              true
            )}
            type="poster"
            alt=""
            className="ratio-poster"
          />
          <ServerImage
            src={getServerImgPath(id, poster, "movie", "poster")}
            alt=""
            type="poster"
            className="media-content landscape-card-img ratio-poster"
          />
          {/* <MovieImg
          src={poster}
          type="poster"
          size="w185"
          style={{ width: "100%" }}
        /> */}
          <div className="details">
            <small>{year}</small>
            <p>{title}</p>
          </div>
        </div>
      </Link>
      <BottomMovTVYeas dataObj={dataObj} />
    </>
  );
}
//?=== Search Poster Card End ===?//

//?=== Search Poster Video Card Start ===?//
export const PosterVideoCard = ({ dataObj, choice = "portrait" }) => {
  const { MovieID } = dataObj;
  const {
    title,
    id,
    category,
    rating,
    story,
    year,
    poster,
    trailer,
    backdrop,
  } = getCommonObj(dataObj);
  const { notDesktop, handlePlayBanner } = useContext(WindowContext);
  const thisCard = useRef(null);
  const [hoverCard, setHoverCard] = useState(false);
  const hoverRef = useRef(null);

  const checkPossition = () => {
    let lefted = thisCard.current.offsetLeft;
    let righted =
      window.innerWidth - (thisCard.current.clientWidth + lefted + 40);
    if (!notDesktop) {
      if (lefted <= 100) {
        thisCard.current.classList.add("lefted-card-hover");
      } else if (righted < 60) {
        thisCard.current.classList.add("righted-card-hover");
      }
    }
  };

  return (
    <>
      <div
        className={`poster-video-card ${
          !notDesktop && "poster-video-card-hover"
        }`}
        ref={thisCard}
        onMouseEnter={() => {
          handlePlayBanner(false);
          hoverRef.current = setTimeout(() => {
            setHoverCard(true);
          }, video_play_delay);
          checkPossition();
        }}
        onMouseLeave={() => {
          clearInterval(hoverRef.current);
          setHoverCard(false);
          handlePlayBanner(true);
        }}
        style={{
          transform: "none !important",
        }}
      >
        {!notDesktop ? (
          choice === "portrait" ? (
            <ServerImage
              src={getServerImgPath(
                id,
                poster,
                dataObj?.MovieID ? "movie" : "tv",
                "poster",
                true
              )}
              type="poster"
              alt=""
              className="card-img poster ratio-poster"
              style={{
                aspectRatio: 0.67,
                objectFit: "cover",
              }}
            />
          ) : (
            // <MovieImg type="backdrop" src={backdrop} className="card-img" />
            <ServerImage
              src={getServerImgPath(
                id,
                backdrop,
                dataObj?.MovieID ? "movie" : "tv",
                "backdrop",
                true
              )}
              alt=""
              type="screen"
              className="card-img cover ratio-backdrop"
              style={{
                aspectRatio: 1.77,
                objectFit: "cover",
              }}
            />
          )
        ) : (
          <ServerImage
            src={getServerImgPath(
              id,
              poster,
              dataObj?.MovieID ? "movie" : "tv",
              "poster",
              true
            )}
            type="poster"
            alt=""
            className="card-img poster ratio-poster"
            style={{
              aspectRatio: 0.67,
              objectFit: "cover",
            }}
          />
        )}

        <PlayButton
          to={`/${MovieID ? "movies" : "tv-series"}/${titleRoute(id)}`}
        />
        {hoverCard && (
          <Trailer
            trailer={trailer}
            className="card-video"
            height="150%"
            widht="150%"
          />
        )}
        <div className="poster-ratting">
          <i className="fas fa-star"></i> {rating}
        </div>
        <ul className="poster-action-btns">
          <li>
            <FavouriteListButton dataObj={dataObj} placement="left" />
          </li>
          <li>
            <OverlayTrigger overlay={<Tooltip>Like</Tooltip>}>
              <i className="fas fa-thumbs-up"></i>
            </OverlayTrigger>
          </li>
          <li>
            <MuteUnMuteButton placement="left" />
          </li>
        </ul>
        {!notDesktop && (
          <div
            className="initial-details"
            style={{ background: choice === "portrait" ? "transparent" : "" }}
          >
            {choice.includes("portrait") ? (
              <>
                {/* <p className="initial-card-title">
                {title} ({year})
              </p> */}
              </>
            ) : (
              choice.includes("landscape") && (
                <LogoOrTitle imgStyle={{ width: "30%" }} id={id}>
                  {title} ({year})
                </LogoOrTitle>
              )
            )}
          </div>
        )}
        <div className="card-details">
          <div className="card-details-wrap">
            <h3 className="title">{title}</h3>
            <div className="thumbs">
              <span className="thumb">{category}</span>
              <span className="thumb">{year}</span>
            </div>
            <p className="story text-in-2">{story}</p>
          </div>
        </div>
      </div>
      <BottomMovTVYeas dataObj={dataObj} />
    </>
  );
};
//?=== Search Poster Video Card End ===?//

// Mobile Card//

export const MobileCard = ({ dataObj, showTitle }) => {
  const { id, poster } = getCommonObj(dataObj);
  return (
    <>
      {(dataObj.MovieID || dataObj.TVID) && (
        <Link
          className="mobile-card-link"
          to={
            dataObj?.MovieID
              ? `/movies/${dataObj?.MovieID}`
              : `/tv-series/${dataObj.TVID}`
          }
          style={{
            width: "100%",
          }}
        >
          <ServerImage
            src={getServerImgPath(
              id,
              poster,
              dataObj?.MovieID ? "movie" : "tv",
              "poster",
              true
            )}
            type="poster"
            alt=""
            className="ratio-poster w-100 mb-1 rounded-sm"
          />
          <p className="line-1">
            {" "}
            {dataObj?.MovieTitle ||
              dataObj?.TVtitle ||
              dataObj?.title ||
              dataObj?.GamesTitle}
          </p>
        </Link>
      )}
      {(dataObj?.game || dataObj?.software) && (
        <div>
          <img
            src={`${_HIT_ORIGIN}/${
              (dataObj?.game && "game.jpg") ||
              (dataObj?.game && "software.jpg") ||
              "no-poster-image.jpg"
            }`}
            type="poster"
            alt=""
            className="ratio-poster w-100 mb-1 rounded-sm"
          />
          <p className="line-1 mb-1">
            {dataObj?.title || dataObj?.GamesTitle}
          </p>
          <a
            href={dataObj?.downLink || dataObj?.DownloadLink}
            className="d-block w-100 mb-1 text-center"
            style={{
              fontSize: 12,
              fontWeight: "500",
              background: "#ffffff30",
              padding: "5px",
              borderRadius: 5,
            }}
          >
            DOWNLOAD
          </a>
        </div>
      )}
      <BottomMovTVYeas dataObj={dataObj} />
    </>
  );
};

// Genre Card

export const GenreCard = ({ item = {} }) => {
  const [hovered, setHovered] = useState(false);
  const { notDesktop } = useContext(WindowContext);
  const [play, setPlay] = useState(false);
  const path = `/${item?.type?.includes("movie") ? "movies" : "tv-series"}?${
    item?.genre ? "genre" : "category"
  }=${item?.genre || item?.category}#filter-section`;
  const itemPath = `/${
    item?.type?.includes("movie") ? "movies" : "tv-series"
  }/${item?.content_id}`;
  useState(() => {
    setPlay(true);
    return () => setPlay(false);
  }, []);

  return (
    <>
      <HashLink to={path} style={{ width: "100%" }}>
        <article
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="genre-card"
          style={{
            background: `url('${item.image}')`,
          }}
        >
          {item.name}
          {hovered && !notDesktop && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${
                str_to_arr(item.trailer, ",")[0]
              }`}
              className="trailer"
              playing={play}
              muted={true}
              config={{
                youtube: {
                  showinfo: 0,
                },
              }}
            />
          )}
        </article>
      </HashLink>

      <Link to={itemPath} style={{ width: "100%" }} className="item-link">
        <img src={item.logo} alt="" className="logo" />
      </Link>
    </>
  );
};

export function ContinueWatchingCard({ dataObj, dataType }) {
  const { handleWatchingPopup, notDesktop } = useContext(WindowContext);
  return (
    <Card
      className="continue-watching-card"
      onClick={() => {
        if (notDesktop) {
          handleWatchingPopup({
            id: dataObj.MovieID || dataObj.TVID,
            show: true,
          });
        }
      }}
    >
      {!notDesktop && (
        <div className="hover-area">
          <div
            className="icon"
            onClick={() => {
              if (!notDesktop) {
                handleWatchingPopup({
                  id: dataObj.MovieID || dataObj.TVID,
                  show: true,
                });
              }
            }}
          >
            <i className="fas fa-search-plus"></i>
          </div>
        </div>
      )}
      <div className="continue-watching-card-media">
        <ServerImage
          src={getServerImgPath(
            dataObj?.MovieID || dataObj?.TVID,
            dataObj?.backdrops_Poster || dataObj?.tv_show?.TVbackdrops,
            dataObj?.MovieID ? "movie" : "tv",
            "screen"
          )}
          type="screen"
          className="continue-watching-card-mobile-poster"
        />
        <Logo
          id={dataObj?.MovieID || dataObj?.TVID}
          className="continue-card-logo"
        />
        {dataObj.TVID && (
          <div className="d-flex flex-column text-end floating-item bottom-right">
            <span>Season {dataObj?.list[0]?.s}</span>
            <span>Episode {dataObj?.list[0]?.e}</span>
          </div>
        )}
        <div className="category  floating-item top-left fw-bold">
          <Link
            to={
              dataObj?.MovieID
                ? `/movies?category=${dataObj.MovieCategory}`
                : `/tv-series?category=${dataObj?.tv_show?.TVcategory}`
            }
          >
            {dataObj.MovieCategory || dataObj?.tv_show?.TVcategory}
          </Link>
        </div>
      </div>
      <Card.Body className="continue-watching-card-body">
        <div className="title-rating">
          <p className="card-item-title">
            {dataObj?.MovieTitle || dataObj?.tv_show?.TVtitle}
          </p>
          {(dataObj.MovieRatings || dataObj?.tv_show?.TVRatings) && (
            <div className="rating">
              <i className="fas fa-star"></i>{" "}
              {dataObj?.MovieID
                ? dataObj.MovieRatings
                : dataObj?.tv_show?.TVRatings}
            </div>
          )}
        </div>
        <div className="d-flex justify-content-between gap-2"></div>
        <div className="play-bar">
          <div
            className="after"
            style={{ width: `${dataObj?.time || dataObj?.list[0]?.time}%` }}
          ></div>
        </div>
      </Card.Body>
    </Card>
  );
}

export function ContinueWatchingCardMobile({ dataObj, dataType }) {
  return (
    <Link
      to={`/player?id=${
        dataType?.includes("movie")
          ? dataObj?.MovieID
          : `${dataObj?.TVID}&season=${dataObj?.list[0]?.s}&episode=${dataObj?.list[0]?.e}`
      }`}
      style={{ width: "100%" }}
    >
      <div className="continue-watching-card-mobile">
        <ServerImage
          src={getServerImgPath(
            dataObj?.MovieID || dataObj?.TVID,
            dataObj?.poster || dataObj?.tv_show?.TVposter,
            dataObj?.MovieID ? "movie" : "tv",
            "poster"
          )}
          type="poster"
          className="continue-watching-card-mobile-poster"
        />
        <div className="body">
          <div className="play-bar">
            <div
              className="after"
              style={{ width: `${dataObj?.time || dataObj?.list[0]?.time}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
