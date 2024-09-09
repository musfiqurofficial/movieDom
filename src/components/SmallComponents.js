import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import "../assets/scss/style.scss";
import { getMovieTime, getTMDBimgPath, str_to_arr } from "../tools";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { IoVolumeHighSharp, IoVolumeMute } from "react-icons/io5";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import { useContext } from "react";
import { WindowContext } from "../Context/WindowContextProvider";
import { FaArrowUp } from "react-icons/fa";
import { MainServerURL } from "../api/MovieDom";
import { getEpisodImg } from "../api/getImage";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import useLS from "../Hook/useLS";
import { get_continuous_movies } from "./Player/Api/continue_watching_movie";
import { get_continuous_tv_series } from "./Player/Api/continue_watching_tv_show";
import { SkeletonMDOMTheme } from "./LoadingSkeleton/Loading";
import { NavLink } from "react-router-dom";
// Link component
export const ALink = ({ href, children, ...rest }) => {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};

// Img Component
export const MovieImg = React.forwardRef(
  ({
    style = {},
    type,
    size = "w185",
    className,
    src,
    alt = "movie poster",
    ...rest
  }) => {
    const [loading, setLoading] = useState(true);
    const [path, setPath] = useState(null);
    useEffect(() => {
      setPath(null);
      const newPath = getTMDBimgPath(size, src);
      const img = new Image();
      img.src = newPath;
      img.onload = (e) => {
        setPath(img.src);
        setLoading(false);
      };
      img.onerror = () => {
        type === "poster"
          ? setPath(`${MainServerURL}/no-poster-img.jpg`)
          : setPath(`${MainServerURL}/no-poster.jpg`);
        setLoading(false);
      };
    }, [size, src, type]);
    let classes = `media-content img-fluid w-100 ${className}`;
    switch (type) {
      case "poster": {
        return !loading ? (
          <img
            {...rest}
            className={classes}
            src={path}
            alt={alt}
            style={style}
          />
        ) : (
          <SkeletonMDOMTheme>
            <Skeleton width="100%" className="poster-skeleton" />
          </SkeletonMDOMTheme>
        );
      }
      case "backdrop": {
        return !loading ? (
          <img {...rest} className={classes} src={path} alt={alt} />
        ) : (
          <SkeletonMDOMTheme>
            <Skeleton width="100%" className="backdrop-skeleton" />
          </SkeletonMDOMTheme>
        );
      }
      default: {
        return !loading ? (
          <img {...rest} className={classes} src={path} alt={alt} />
        ) : (
          <SkeletonMDOMTheme>
            <Skeleton width="100%" className="poster-skeleton" />
          </SkeletonMDOMTheme>
        );
      }
    }
  }
);

// Play Button

export const PlayButton = ({ to = "/", className, ...rest }) => {
  const { handlePlayBanner } = useContext(WindowContext);

  return (
    <Link
      to={to}
      className={`video-btn ${className}`}
      onClick={() => {
        handlePlayBanner(true);
        window.scrollBy({
          top: 0,
        });
      }}
    >
      <i className="far fa-play-circle"></i>
      <span className="before"></span>
      <span className="after"></span>
    </Link>
  );
};

// Get Genre
export const GetGenre = ({ genre = "", type = "" }) => {
  return genre.split(",").map((item, i) => (
    <Link
      key={item}
      to={`/${type.includes("movie") ? "movies" : "tv-series"}?genre=${item}`}
    >
      <li className="tag me-2" key={i}>
        {item}
      </li>
    </Link>
  ));
};

// Movie Time
export const MovieTime = ({ time, className, ...rest }) => {
  return (
    <span {...rest} className={className}>
      {getMovieTime(time)}
    </span>
  );
};

export const Button = ({ children, className, variant, ...rest }) => {
  if (variant === "red") {
    return (
      <button {...rest} className={`btn ${className}`}>
        {children}
      </button>
    );
  }
};

/**
 * Movie Trailer
 */

export const Trailer = ({ trailer, height, width, className, ...rest }) => {
  const { muted, notDesktop, handlePlayBanner, playBanner } =
    useContext(WindowContext);
  const [show, setShow] = useState(true);
  const [play, setPlay] = useState(!playBanner);
  useEffect(() => {
    setPlay(true);
    return () => setPlay(false);
  }, []);
  return (
    show &&
    !notDesktop && (
      <ReactPlayer
        {...rest}
        className={className}
        config={{
          youtube: {
            playerVars: {
              vq: "hd720",
            },
          },
        }}
        url={`https://www.youtube.com/watch?v=${str_to_arr(trailer, ",")[0]}`}
        controls={false}
        playing={play && true}
        height={height || "100%"}
        width={width || "100%"}
        muted={muted}
        onPlay={() => {
          setShow(true);
          handlePlayBanner(false);
        }}
        onEnded={() => {
          setShow(false);
        }}
      />
    )
  );
};

export const BannerTrailer = ({
  loop = false,
  trailer,
  height,
  width,
  className,
  playing = true,
  onPlay,
  onEnded,
  ...rest
}) => {
  const {
    muted,
    watching_popup,
    notDesktop,
    playBanner,
    handleNotScrolled,
    handlePlayBanner,
  } = useContext(WindowContext);
  const [show, setShow] = useState(true);
  const [play_banner, setPlayBanner] = useState(false);
  const url = `https://www.youtube.com/watch?v=${str_to_arr(trailer, ",")[0]}`;

  useEffect(() => {
    setPlayBanner(false);
    let timeOut = setTimeout(() => {
      handlePlayBanner(true);
      setPlayBanner(!!trailer);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [trailer]);
  if (!show) return null;
  return !watching_popup.show && !notDesktop ? (
    <ReactPlayer
      className={className}
      config={{
        youtube: {
          playerVars: { showinfo: 0 },
        },
      }}
      id="banner-trailer"
      //
      url={url}
      controls={false}
      playing={play_banner && playBanner}
      height={"120%"}
      width={"100%"}
      muted={muted}
      onPlay={() => {
        setShow(true);
        onPlay();
      }}
      onEnded={() => {
        setShow(false);
        onEnded();
      }}
      onReady={() => {
        handleNotScrolled(200 > window.scrollY);
      }}
      onError={() => setShow(false)}
      {...rest}
    />
  ) : (
    <></>
  );
};

export const MuteUnMuteButton = ({ placement }) => {
  const { muted, handleToggleMuted } = useContext(WindowContext);
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<Tooltip>{muted ? "Unmute" : "Mute"}</Tooltip>}
    >
      <i className="sound-button" onClick={handleToggleMuted}>
        {muted ? <IoVolumeMute /> : <IoVolumeHighSharp />}
      </i>
    </OverlayTrigger>
  );
};

export function Logo({ id, ...rest }) {
  const [path, setPath] = useState(null);
  useEffect(() => {
    setPath(null);
    const imgUrl = `${MainServerURL}/Admin/main/images/${id}/logo/${id}.png`;
    const newLogo = new Image();
    newLogo.src = imgUrl;
    newLogo.onload = () => setPath(newLogo.src);
    newLogo.onerror = () => setPath(null);
    return newLogo.onload;
  }, [id]);

  return path ? <img src={path} {...rest} alt="movie-or-tv-logo" /> : <></>;
}

export function LogoOrTitle({
  id,
  year = "",
  imgStyle,
  children,
  className,
  ...rest
}) {
  const [path, setPath] = useState(null);
  useEffect(() => {
    setPath(null);
    const imgUrl = `${MainServerURL}/Admin/main/images/${id}/logo/${id}.png`;
    const newLogo = new Image();
    newLogo.src = imgUrl;
    newLogo.onload = () => setPath(newLogo.src);
    newLogo.onerror = () => setPath(null);
    return newLogo.onload;
  }, [id]);
  return (
    <>
      {path ? (
        <div>
          <img
            {...rest}
            src={path}
            alt="banner-Logo"
            className={`title-or-logo ${className}`}
            style={imgStyle}
          />
        </div>
      ) : (
        children
      )}
    </>
  );
}

export const ShowMore = ({
  children,
  className,
  style,
  hideClass = "text-in-2",
  ...rest
}) => {
  const [show, setShow] = useState(false);
  return (
    <div {...rest}>
      <p style={style} className={`${className} ${!show && hideClass} mb-0`}>
        {children}
      </p>
      <button className="show-more" onClick={() => setShow((state) => !state)}>
        {show ? "See Less" : "See More"}
      </button>
    </div>
  );
};

export const GoToTopButton = () => {
  const [state, setState] = useState(false);
  useEffect(() => {
    let height = window.innerHeight * 2.5;
    function scrollController() {
      let scrollHeight = window.scrollY;
      scrollHeight > height ? setState(true) : setState(false);
    }
    scrollController();
    window.onscroll = scrollController;
  }, []);
  return (
    <a href="#filter-section" className={`go-to-top ${state && "active"}`}>
      <FaArrowUp />
    </a>
  );
};

export const S0E0img = ({ episode = {} }) => {
  const [loading, setLoading] = useState(true);
  const [imgPath, setImgPath] = useState(null);
  useEffect(() => {
    const newPath = getEpisodImg(
      episode?.TVID,
      episode?.season_number,
      episode?.episode_number,
      episode?.still_path
    );
    const img = new Image();
    img.src = newPath;
    img.onload = (e) => {
      setImgPath(img.src);
      setLoading(false);
    };
    img.onerror = () => {
      setImgPath("/no-poster.jpg");
      setLoading(false);
    };
  }, [episode]);

  if (loading) {
    return (
      <SkeletonMDOMTheme>
        <Skeleton width="100%" className="backdrop-skeleton" />
      </SkeletonMDOMTheme>
    );
  } else {
    return (
      <img
        src={imgPath}
        alt={`S${episode.season_number}E${episode.episode_number}`}
      />
    );
  }
};

export const FavouriteListButton = ({
  dataObj = {},
  placement = "top",
  ...rest
}) => {
  const { data, updateLSDBLIST_By_context } = useLS();
  const _exist_in_my_list = data?._my_list?.find((item) =>
    dataObj?.TVID
      ? item.TVID === dataObj?.TVID
      : item.MovieID === dataObj?.MovieID
  );

  return (
    <OverlayTrigger
      placement={placement}
      overlay={
        <Tooltip>
          {_exist_in_my_list ? "Remove from My List" : "Add to My List"}
        </Tooltip>
      }
    >
      <i
        style={{
          fontSize: "20px",
        }}
        {...rest}
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
    </OverlayTrigger>
  );
};

export function WatchingButton({ MovieID, TVID, className = "" }) {
  const [resume, setResume] = useState(false);
  const [S0E0, setS0E0] = useState({ s: 1, e: 1 });
  useEffect(() => {
    if (MovieID) {
      const watching_movie = get_continuous_movies();
      if (watching_movie) {
        const watching_this_movie = watching_movie.find(
          (item) => item.MovieID === MovieID
        );
        watching_this_movie ? setResume(true) : setResume(false);
      }
    } else if (TVID) {
      const watching_tv_series = get_continuous_tv_series();
      if (watching_tv_series) {
        const watching_this_tv_show = watching_tv_series.find(
          (item) => item.TVID === TVID
        );
        if (watching_this_tv_show) {
          const last_watching_epi = watching_this_tv_show?.list[0];
          setS0E0({
            s: last_watching_epi.s,
            e: last_watching_epi.e,
          });
        }
        watching_this_tv_show ? setResume(true) : setResume(false);
      }
    }
  }, [MovieID, TVID]);
  return (
    <Link
      className={className}
      to={`/player?id=${MovieID ? MovieID : TVID}${
        TVID
          ? `&season=${!resume ? "1" : S0E0.s}&episode=${
              !resume ? "1" : S0E0.e
            }`
          : ""
      }`}
    >
      <button variant="red" className={"w-100 mdom-btn justify-content-center"}>
        <span>{resume ? "Resume" : "Play Now"}</span>
        <i className="ms-2 far fa-play-circle"></i>
      </button>
    </Link>
  );
}

export function ServerImage({ src, type = "screen",broken_img, ...rest }) {
  const [path, setPath] = useState(null);
  useEffect(() => {
    setPath(null);
    const img_api = new Image();
    img_api.src = src;
    img_api.onload = () => setPath(img_api.src);
    img_api.onerror = () => setPath(null);
    return () => {
      img_api.onload = null;
      img_api.onerror = null;
    };
  }, [src]);

  return path ? (
    <img src={path} alt="server_image" {...rest} />
  ) : (
    <img
      alt="no_img_found"
      src={broken_img?
        `${MainServerURL}/${broken_img}`
        :type === "poster"?
        `${MainServerURL}/no-poster-img.jpg`
        : `${MainServerURL}/no-poster.jpg`}
      {...rest}
    />
  );
}
