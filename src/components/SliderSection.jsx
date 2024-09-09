import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode, Navigation, EffectCoverflow, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  HoverVideoCard,
  LandScapeCard,
  Portrait,
  MobileCard,
  ContinueWatchingCard,
} from "./Cards";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";
import { WindowContext } from "../Context/WindowContextProvider";
import { AiFillStar } from "react-icons/ai";
import { getCommonObj, getServerImgPath } from "../tools";
import { get_continuous_movies } from "./Player/Api/continue_watching_movie";
import { get_continuous_tv_series } from "./Player/Api/continue_watching_tv_show";
import { get_all_watching_item } from "./Player/Api/continue_watching_combination";
import { ServerImage } from "./SmallComponents";

const SliderHeader = ({ heading, small, route = "" }) => (
  <div className="theme-container">
    <div
      className="section-wrapper mb-1 mb-md-2 mb-lg-3"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="wrap-menu">
        <h3 className="text-light slider-heading">
          {heading} <small>{small}</small>
        </h3>
      </div>
      {route && (
        <div>
          <NavLink to={route} className="slider-see-more">
            See More
          </NavLink>
        </div>
      )}
    </div>
  </div>
);

export const HoverVideoSlider = React.memo(
  ({
    datas = [],
    className = "",
    sliderID = "",
    heading = "",
    small = "",
    data = [],
    route = "",
    ...rest
  }) => {
    const { notDesktop } = useContext(WindowContext);
    return datas.length !== 0 ? (
      <section {...rest} className={className}>
        <SliderHeader heading={heading} small={small} route={route} />
        {notDesktop||true ? (
          <MobileSlider datas={datas} />
        ) : (
          <Swiper
            className={`navigation-slider`}
            id={sliderID}
            slidesPerView="auto"
            spaceBetween={5}
            freeMode={true}
            loop={datas?.length >= 10 ? true : false}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: ".slider-button-prev",
              nextEl: ".slider-button-next",
            }}
            modules={[Navigation, FreeMode]}
          >
            <div className="slider-button-prev">
              <VscArrowLeft />
            </div>
            <div className="slider-button-next">
              <VscArrowRight />
            </div>
            {datas.map((dataObj) => (
              <SwiperSlide key={dataObj.id} className="poster-card">
                <HoverVideoCard dataObj={dataObj} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    ) : (
      <></>
    );
  }
);

export const LandScapeSlider = React.memo(
  ({
    datas = [],
    sliderID = "",
    heading = "",
    route = "",
    small = "",
    ...rest
  }) => {
    const { notDesktop } = useContext(WindowContext);

    return datas.length !== 0 ? (
      <section {...rest} className="tranding-area slider-section">
        <SliderHeader heading={heading} small={small} route={route} />
        <div className="section-wrapper">
          {notDesktop ? (
            <MobileSlider datas={datas} />
          ) : (
            <Swiper
              className={`tranding-slider navigation-slider landscape-slider`}
              id={sliderID}
              slidesPerView="auto"
              spaceBetween={5}
              freeMode
              centeredSlides={datas?.length <= 3}
              loop={datas?.length >= 9 ? true : false}
              pagination={{
                clickable: true,
              }}
              navigation={{
                prevEl: ".slider-button-prev",
                nextEl: ".slider-button-next",
              }}
              modules={[FreeMode, Navigation, Autoplay]}
            >
              <div className="slider-button-prev">
                <VscArrowLeft />
              </div>
              <div className="slider-button-next">
                <VscArrowRight />
              </div>
              {datas.map((dataObj) => (
                <SwiperSlide key={dataObj.id} className="viewed-slide">
                  <LandScapeCard dataObj={dataObj} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    ) : (
      <></>
    );
  }
);

export const VerticalSlider = React.memo(
  ({
    datas = [],
    className = "",
    sliderID = "",
    heading = "",
    small = "",
    route = "",
    ...rest
  }) => {
    const { notDesktop, handlePlayBanner } = useContext(WindowContext);

    return datas.length !== 0 ? (
      <section
        {...rest}
        className={`${className} recently-area slider-section`}
      >
        <SliderHeader heading={heading} small={small} route={route} />
        <div
          className="section-wrapper"
          onMouseOver={() => handlePlayBanner(false)}
          onMouseLeave={() => handlePlayBanner(true)}
        >
          {(notDesktop) ? (
            <MobileSlider datas={datas} />
          ) : (
            <Swiper
              className={`navigation-slider viewed-slider vertical-slider`}
              id={sliderID}
              spaceBetween={10}
              freeMode
              centeredSlides={datas?.length <= 3}
              loop={datas?.length >= 10 ? true : false}
              pagination={{
                clickable: true,
              }}
              navigation={{
                prevEl: ".slider-button-prev",
                nextEl: ".slider-button-next",
              }}
              modules={[Navigation, FreeMode]}
              breakpoints={{
                640: {
                  slidesPerView: 4.5,
                },
                1080: {
                  slidesPerView: 6.2,
                },
                1460: {
                  slidesPerView: 7.2,
                },
                1920: {
                  slidesPerView: 8.2,
                },
              }}
            >
              <div className="slider-button-prev">
                <VscArrowLeft />
              </div>
              <div className="slider-button-next">
                <VscArrowRight />
              </div>
              {datas.map((dataObj) => (
                <SwiperSlide key={dataObj.id} className="viewed-slide">
                  <Portrait dataObj={dataObj} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    ) : (
      <></>
    );
  }
);

export function MobileSlider({ datas = [] }) {
  return (
    <Swiper
      className={`mobileSlider`}
      spaceBetween={3}
      loop={datas?.length >= 10 ? true : false}
      pagination={{
        clickable: true,
      }}
      navigation={{
        prevEl: ".slider-button-prev",
        nextEl: ".slider-button-next",
      }}
      modules={[Navigation, FreeMode]}
      breakpoints={{
        640: {
          slidesPerView: 4.5,
        },
        480: {
          slidesPerView: 3.6,
        },
        360: {
          slidesPerView: 3.2,
        },
        240: {
          slidesPerView: 2.2,
        },
      }}
    >
      <div className="slider-button-prev">
        <VscArrowLeft />
      </div>
      <div className="slider-button-next">
        <VscArrowRight />
      </div>
      {datas.map((dataObj) => (
        <SwiperSlide key={dataObj.id}>
          <MobileCard dataObj={dataObj} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

//===//===CONTINUE==WATCHING==START====//====//

export function ContinueWatchingSlider({ className, dataType = "", ...rest }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    switch (dataType) {
      case "movies":
        const watching_movies = get_continuous_movies();
        watching_movies ? setData(watching_movies.slice(0, 15)) : setData([]);
        break;
      case "tv-series":
        const watching_tv_show = get_continuous_tv_series();
        watching_tv_show ? setData(watching_tv_show.slice(0, 15)) : setData([]);
        break;
      default:
        const combination_watching = get_all_watching_item();
        combination_watching
          ? setData(combination_watching.slice(0, 15))
          : setData([]);
    }
  }, [dataType]);
  return data.length !== 0 ? (
    <section {...rest} className={`${className} slider-section`}>
      <SliderHeader
        heading="Continue Watching"
        small={
          dataType.includes("movie")
            ? "Movies"
            : dataType.includes("TV Series")
            ? "TV Series"
            : ""
        }
      />
      <div className="theme-container">
        <Swiper
          slidesPerView={4}
          spaceBetween={6}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="continue-watching-slider"
          modules={[FreeMode, Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
            },
            480: {
              slidesPerView: 2.2,
            },
            640: {
              slidesPerView: 3.2,
            },
            920: {
              slidesPerView: 3.2,
            },
            1080: {
              slidesPerView: 4.2,
            },
            1240: {
              slidesPerView: 4.2,
            },
            1480: {
              slidesPerView: 4.2,
            },
            1640: {
              slidesPerView: 5.2,
            },
            1780: {
              slidesPerView: 6.2,
            },
          }}
        >
          {data.map((item, i) => (
            <SwiperSlide key={i}>
              {/* {notDesktop ? (
                <ContinueWatchingCardMobile
                  dataType={item.MovieID ? "movies" : "tv-series"}
                  dataObj={item}
                />
              ) : ( */}
              <ContinueWatchingCard
                dataType={item.MovieID ? "movies" : "tv-series"}
                dataObj={item}
              />
              {/* )} */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  ) : (
    <></>
  );
}

//===//===CONTINUE==WATCHING==END====//====//

//===?==== MOBILE SLIDER START ====?====//

export const MovileBannerSlider = ({ datas = [], type = "" }) => {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={1.2}
      loop={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 120,
        modifier: 1.5,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow]}
      className="mobile-banner-slider"
      breakpoints={{
        560: {
          slidesPerView: 2,
        },
        678: {
          slidesPerView: 2.2,
        },
      }}
    >
      {datas.map((data) => {
        const { id, title, poster, rating } = getCommonObj(data);
        return (
          <SwiperSlide key={data.id}>
            <Link
              to={`/${type.includes("movie") ? "movies" : "tv-series"}/${id}`}
              style={{ width: "100%" }}
            >
              <div className="mobile-banner-slide">
                <ServerImage
                  src={getServerImgPath(
                    id,
                    poster,
                    data?.MovieID ? "movie" : "tv",
                    "poster"
                  )}
                  type="poster"
                  alt=""
                  className="media-content img-fluid w-100 ratio-poster"
                />
                <div className="details">
                  <p>{title}</p>
                  <span className="rating">
                    <AiFillStar /> <span className="num">{rating}</span>
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

//===?==== MOBILE SLIDER END ====?====//
