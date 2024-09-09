import React, { useState } from "react";
import { FirstHomeSlider, HomeSlider } from "../Sliders";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
// import required modules
import { EffectFade, Navigation, Thumbs } from "swiper";
import { Col, Row } from "react-bootstrap";
import { MovieImg, ServerImage } from "../SmallComponents";
import { getServerImgPath } from "../../tools";

const HomeBannerThumbs = React.memo(({ thumbsSwiper, data }) => {

  return (
    <Swiper
      className="thumbs"
      dir="rtl"
      thumbs={{ swiper: thumbsSwiper }}
      freeMode={true}
      loop={true}
      watchSlidesProgress={true}
      modules={[Navigation, Thumbs]}
      navigation={{
        prevEl: ".slider-button-prev",
        nextEl: ".slider-button-next",
      }}
      breakpoints={{
        768: {
          slidesPerView: 5.5,
          spaceBetween: 4,
        },
        1024: {
          slidesPerView: 6.5,
          spaceBetween: 6,
        },
        1680: {
          slidesPerView: 8.5,
          spaceBetween: 8,
        },
      }}
    >
      {data.map((movie) => (
        <SwiperSlide key={movie.id}>
          <ServerImage src={getServerImgPath(movie?.MovieID,movie?.poster,movie?.MovieID?'movie':'tv','poster',true)} className="media-content" alt=""  type='poster'/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

const HomeBanner = ({ data }) => {
  const [sliderVideoOff, setSliderVideoOff] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className="banner-area">
      <Swiper
        className="banner-slides"
        effect={"fade"}
        pagination={true}
        allowTouchMove={false}
        onSwiper={setThumbsSwiper}
        modules={[EffectFade]}
        onSlideChange={(e) => {
          let currentSlider = e?.activeIndex ? e.activeIndex : 0;
          currentSlider !== 0
            ? setSliderVideoOff(true)
            : setSliderVideoOff(false);
        }}
      >
        {data.map((movie, i) =>
          i === 0 ? (
            <SwiperSlide key={movie.id}>
              <FirstHomeSlider movie={movie} sliderVideoOff={!sliderVideoOff} />
            </SwiperSlide>
          ) : (
            <SwiperSlide key={movie.id}>
              <HomeSlider movie={movie} />
            </SwiperSlide>
          )
        )}
      </Swiper>
      <div className="thumb-area">
        <div className="slider-title">
          <Row className="align-items-center">
            <Col md={12} lg={12}>
              <Row>
                <Col md={6}>
                  <h4>Popular This Week</h4>
                </Col>
                <Col md={6} className="text-end">
                  <button className="slider-nav slider-button-prev">
                    <i className="fas fa-arrow-left text-white"></i>
                  </button>
                  <button className="slider-nav slider-button-next ms-2">
                    <i className="fas fa-arrow-right text-white"></i>
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Col xs={12} md={12} lg={12}>
          <HomeBannerThumbs thumbsSwiper={thumbsSwiper} data={data} />
        </Col>
      </div>
    </section>
  );
};

export default React.memo(HomeBanner);
