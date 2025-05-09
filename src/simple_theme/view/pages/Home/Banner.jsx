import React, { useEffect, useState } from "react";
import MovieDom, { SINGLE_BANNER, SLIDER_BANNER } from "../../../Api/MovieDom";
import { _STATUS } from "../../../constant";
import { getServerImgPath } from "../../../lib/tools";
import {
  Banner as BannerWrapper,
  BannerCard,
  BannerCardContent,
  BigPlayButton,
} from "../../../style/banner/Banner";
import { Button } from "../../../style/common/Button";
import { A, StyledNavLink, Tag, Tags } from "../../../style/common/Tag";
import { H2, H4, H5, P } from "../../../style/typography/typography";
import { If } from "react-haiku";
import { Card, Placeholder } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Autoplay, Navigation } from "swiper";
import SingleBanner from "./SingleBanner";
import SimpleBanner from "./SimpleBanner";

const Banner = () => {
  const [status, setStatus] = useState(_STATUS.loading);
  const [data, setData] = useState([]);

  useEffect(() => {
    setStatus(_STATUS.loading);
    if (SINGLE_BANNER.value) {
      MovieDom.getMovies({ limit: SINGLE_BANNER.slide_number || 1 })
        .then((dt) => {
          setData(dt);
          setStatus(_STATUS.success);
        })
        .catch(() => setStatus(_STATUS.failed));
    } else {
      MovieDom.getMovies({ limit: SLIDER_BANNER ? 12 : 4 })
        .then((dt) => {
          setData(dt);
          setStatus(_STATUS.success);
        })
        .catch(() => setStatus(_STATUS.failed));
    }
  }, []);

  if(true){
    return <SimpleBanner data={data}  />
  }
  // IF SINGLE BANNER
  if (
    SINGLE_BANNER.value &&
    (!SINGLE_BANNER.slide_number || SINGLE_BANNER.slide_number === 1)
  ) {
    return <SingleBanner dataObj={data[0]} status={status} />;
  }
  if (SINGLE_BANNER.value && SINGLE_BANNER.slide_number > 1) {
    return (
      <div className="position-relative">
        <Swiper
          slidesPerView={1}
          loop
          modules={[Navigation]}
          navigation={{
            nextEl: "#next-nav-single-banner",
            prevEl: "#prev-nav-single-banner",
          }}
        >
          {data.map((ele) => (
            <SwiperSlide>
              <SingleBanner dataObj={ele} status={status} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          id="prev-nav-single-banner"
          className="single-banner-navigation-btn prev"
        >
          <i class="fas fa-arrow-left"></i>
        </button>
        <button
          id="next-nav-single-banner"
          className="single-banner-navigation-btn next"
        >
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    );
  }

  return (
    <>
      <If isTrue={status === _STATUS.success}>
        <If isTrue={SLIDER_BANNER}>
          <Swiper
            spaceBetween={0}
            slidesPerView={6}
            breakpoints={{
              200: {
                slidesPerView: 1,
              },
              440: {
                slidesPerView: 2,
              },
              800: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              playOnMouseLeave: true,
            }}
            modules={[Autoplay]}
          >
            {data.map((item) => (
              <SwiperSlide>
                <BannerCard
                  bgImage={getServerImgPath(
                    item.MovieID,
                    item.poster,
                    "movie",
                    "poster"
                  )}
                >
                  <BannerCardContent>
                    <div className="mb-4">
                      <A
                        as={NavLink}
                        to={
                          item.MovieID
                            ? `/movies/${item.MovieID}`
                            : `/tv-series/${item.TVID}`
                        }
                        className="center flex-column hover-hide bounce-trnasition"
                      >
                        <BigPlayButton className="center mb-2">
                          <i class="fa-solid fa-play"></i>
                        </BigPlayButton>
                        <H5 style={{ fontWeight: "500" }}>Watch Now</H5>
                      </A>
                    </div>
                    <div className="w-100 p-2">
                      <H4 className="fw-bold mb-0">{item.MovieTitle}</H4>
                      <Tags className="mb-0">
                        <Tag>
                          <StyledNavLink
                            to={`${
                              item.MovieID ? "/movies" : "/tv-series"
                            }?yaer=${item.MovieYear || item.TVrelease}`}
                          >
                            {item.MovieYear}
                          </StyledNavLink>
                        </Tag>
                        <Tag>
                          <StyledNavLink
                            to={`${
                              item.MovieID ? "/movies" : "/tv-series"
                            }?category=${item.MovieCategory || item.TVrelease}`}
                          >
                            {item.MovieCategory}
                          </StyledNavLink>
                        </Tag>
                      </Tags>
                      <div className="">
                        <P className="fw-700 line-2  content-hover-hide mb-1">
                          {item.MovieStory}
                        </P>
                        <Button
                          as={NavLink}
                          to={
                            item.MovieID
                              ? `/movies/${item.MovieID}`
                              : `/tv-series/${item.TVID}`
                          }
                          className="content-hover-hide p-2"
                        >
                          Watch Now
                        </Button>
                      </div>
                    </div>
                  </BannerCardContent>
                </BannerCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </If>
        <If isTrue={!SLIDER_BANNER}>
          <BannerWrapper>
            {data.map((item) => (
              <BannerCard
                bgImage={getServerImgPath(
                  item.MovieID,
                  item.poster,
                  "movie",
                  "poster"
                )}
              >
                <BannerCardContent>
                  <div className="mb-4">
                    <A
                      as={NavLink}
                      to={
                        item.MovieID
                          ? `/movies/${item.MovieID}`
                          : `/tv-series/${item.TVID}`
                      }
                      className="center flex-column hover-hide bounce-trnasition"
                    >
                      <BigPlayButton className="center mb-2">
                        <i class="fa-solid fa-play"></i>
                      </BigPlayButton>
                      <H4 style={{ fontWeight: "500" }}>Watch Now</H4>
                    </A>
                  </div>
                  <div className="w-100 p-2">
                    <H2 className="fw-bold">{item.MovieTitle}</H2>
                    <Tags>
                      <Tag>
                        <StyledNavLink
                          to={`${
                            item.MovieID ? "/movies" : "/tv-series"
                          }?yaer=${item.MovieYear || item.TVrelease}`}
                        >
                          {item.MovieYear}
                        </StyledNavLink>
                      </Tag>
                      <Tag>
                        <StyledNavLink
                          to={`${
                            item.MovieID ? "/movies" : "/tv-series"
                          }?category=${item.MovieCategory || item.TVrelease}`}
                        >
                          {item.MovieCategory}
                        </StyledNavLink>
                      </Tag>
                    </Tags>
                    <div className="">
                      <P className="fw-700 line-2  content-hover-hide">
                        {item.MovieStory}
                      </P>
                      <Button
                        as={NavLink}
                        to={
                          item.MovieID
                            ? `/movies/${item.MovieID}`
                            : `/tv-series/${item.TVID}`
                        }
                        className="content-hover-hide"
                      >
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </BannerCardContent>
              </BannerCard>
            ))}
          </BannerWrapper>
        </If>
      </If>
      <BannerWrapper>
        <If isTrue={status === _STATUS.loading}>
          {[...Array(4)].map((_, id) => (
            <Placeholder
              as={Card.Body}
              animation="glow"
              className="p-1"
              key={id}
            >
              <Placeholder
                xs={12}
                className="poster"
                style={{
                  minHeight: 320,
                }}
              />
            </Placeholder>
          ))}
        </If>
      </BannerWrapper>
    </>
  );
};

export default Banner;
