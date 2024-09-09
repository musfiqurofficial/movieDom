import React from "react";
import { useState } from "react";
import { MdOutlineFavorite } from "react-icons/md";
import { RiPauseFill } from "react-icons/ri";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import { GrPlayFill } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Navigation } from "swiper";
import { useEffect } from "react";
import { VscArrowRight, VscArrowLeft } from "react-icons/vsc";
import { Tab, Tabs } from "react-bootstrap";
import {
  getCommonObj,
  getS0E0,
  getServerImgPath,
  str_to_arr,
} from "../../tools";
import ReactPlayer from "react-player";
import { IoStar } from "react-icons/io5";
import {
  GetGenre,
  PlayButton,
  S0E0img,
  ShowMore,
  WatchingButton,
} from "../SmallComponents";
import MovieDom from "../../api/MovieDom";
import { NavLink } from "react-router-dom";
import useLS from "../../Hook/useLS";
import { saveFile } from "../Player/Player";

const TabContent = React.memo(({ featuredEpisode, index,tvSeries }) => {
  return (
    <Swiper
      slidesPerView={1.2}
      spaceBetween={5}
      loop={false}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Navigation, Autoplay]}
      breakpoints={{
        1024: {
          slidesPerView: 5.5,
        },
        920: {
          slidesPerView: 4.5,
        },
        760: {
          slidesPerView: 3.5,
        },
        540: {
          slidesPerView: 2.5,
        },
        380: {
          slidesPerView: 1.5,
        },
        320: {
          slidesPerView: 1.4,
        },
        240: {
          slidesPerView: 1.2,
        },
      }}
      navigation={{
        nextEl: ".slider-button-next",
        prevEl: ".slider-button-prev",
      }}
      className="featured-slider"
    >
      <div className="slider-button-prev">
        <VscArrowLeft />
      </div>
      <div className="slider-button-next">
        <VscArrowRight />
      </div>
      {!isNaN(index) &&
        featuredEpisode.map(
          (episode) =>
            Number(episode?.season_number) === index + 1 && (
              <SwiperSlide key={episode.id} className="episode-card">

              <button
              onClick={() =>
                saveFile(episode?.watchlink, `${tvSeries.TVtitle}-${episode?.name}`)
              }
              className="btn btn-download p-2 rounded-pill center m-1 episode-download-btn"
            >
              <i className="fas fa-download"></i>
            </button>
                <NavLink
                  style={{ width: "100%" }}
                  to={`/player?id=${episode.TVID}&season=${episode.season_number}&episode=${episode.episode_number}`}
                >
                  <PlayButton
                    to={`/player?id=${episode.TVID}&season=${episode.season_number}&episode=${episode.episode_number}`}
                  />
                  <S0E0img episode={episode} />
                  <p className="S-E">
                    S<small>{getS0E0(episode.season_number)}</small> E
                    <small>{getS0E0(episode.episode_number)}</small>
                  </p>
                  <p className="E-Title">{episode.name}</p>
                </NavLink>
              </SwiperSlide>
            )
        )}
    </Swiper>
  );
});

const TabBox = React.memo(({ seasonNumber, featuredEpisode,tvSeries }) => {
  const [key, setKey] = useState(`season${seasonNumber}`);
  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
      {!isNaN(seasonNumber) &&
        [...Array(seasonNumber)].map((e, index) => (
          <Tab
            eventKey={`season${index + 1}`}
            key={index}
            title={`Season ${index + 1}`}
          >
            <TabContent featuredEpisode={featuredEpisode} tvSeries={tvSeries} index={index} />
          </Tab>
        ))}
    </Tabs>
  );
});

export const FeaturedSection = ({ dataObj }) => {
  const [playTrailer, setPlayTrailer] = useState(false);
  const [featuredEpisode, setFeaturedEpisode] = useState([]);
  const { id, trailer, story, year, rating, title, genre, category, backdrop } =
    getCommonObj(dataObj);
  useEffect(() => {
    MovieDom.getTVEpisodes({ tvid: id }).then((dt) => setFeaturedEpisode(dt));
  }, [id]);
  const seasonNumber = Number(
    featuredEpisode[featuredEpisode?.length - 1]?.season_number
  );
  const TVtrailers = trailer && trailer.split(",");
  const t_trailer = TVtrailers && TVtrailers[TVtrailers?.length - 1];

  const { data, updateLSDBLIST_By_context } = useLS();
  const _exist_in_my_list = data?._my_list?.find((item) =>
    dataObj?.TVID
      ? item?.TVID === dataObj?.TVID
      : item?.MovieID === dataObj?.MovieID
  );

  return dataObj ? (
    <section
      className="featured-section"
      style={{
        background: `#00000060 url(${getServerImgPath(
          id,
          backdrop,
          "tv",
          "backdrop",
          true
        )})`,
      }}
    >
      {playTrailer && (
        <ReactPlayer
          className="featured-tv-trailer"
          url={`https://www.youtube.com/watch?v=${
            str_to_arr(t_trailer, ",")[0]
          }?autoplay=0&autohide=1&showinfo=0&controls=0`}
          controls={false}
          config={{
            youtube: {
              playerVars: {
                vq: "hd720",
              },
            },
          }}
          playing={playTrailer}
          height="100%"
          muted={false}
          width="100%"
          onEnded={() => setPlayTrailer(false)}
        />
      )}

      <div
        className="theme-container"
        style={{ textAlign: playTrailer && "left" }}
      >
        <div
          className="series-details"
          style={{ textAlign: playTrailer && "left" }}
        >
          <p className="tv-ratting">
            <IoStar />
            {rating}
          </p>
          <p>Featured TV Series</p>
          <h2>
            {title} ( {year} )
          </h2>
          <ul
            className="tv-genre"
            style={{ justifyContent: playTrailer ? "left" : "center" }}
          >
            <GetGenre genre={genre} type="tv" />
          </ul>
          <p className="tv-category">{category}</p>
          <ShowMore
            className="tv-story"
            style={{ margin: playTrailer ? 0 : "auto" }}
          >
            {story}
          </ShowMore>
          <ul
            className="featured-action-btns"
            style={{
              justifyContent: playTrailer ? "start" : "center",
            }}
          >
            <li>
              <MdOutlineFavorite />
            </li>
            {t_trailer && (
              <li
                className="play-toggler"
                onClick={() => setPlayTrailer((pre) => !pre)}
              >
                {playTrailer ? <RiPauseFill /> : <GrPlayFill />}
              </li>
            )}
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
          </ul>
          <div className="mt-2 mt-md-3">
            <WatchingButton MovieID={dataObj?.MovieID} TVID={dataObj?.TVID} />
          </div>
        </div>
        <div
          className={`episode-slider-container ${
            playTrailer ? "toggle-fade" : ""
          }`}
        >
          {!!seasonNumber && (
            <TabBox
              tvSeries={dataObj}
              seasonNumber={seasonNumber}
              featuredEpisode={featuredEpisode}
            />
          )}
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default FeaturedSection;
