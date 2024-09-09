import React from "react";
import { NavLink } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { LiveTVCard } from "./LiveTVGrid";
import "swiper/css";
import "swiper/css/navigation";

const LiveTVSlider = ({ data = [], title = "LiveTV" }) => {
  return (
    <section className="pt-0 mt-5 slider-section">
      <div className="theme-container">
        <div className="slider-header d-flex flex-wrap justify-content-start align-items-center gap-2">
          <h3 className="mb-0 title">{title}</h3>
          <NavLink to="/live-tv/all">All</NavLink>
        </div>
      </div>
      <Swiper
        spaceBetween={10}
        className="live-tv-slider"
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          240: {
            slidesPerView: 2.1,
            slidesPerGroup: 1.8,
          },
          360: {
            slidesPerView: 3.1,
            slidesPerGroup: 2.8,
          },
          640: {
            slidesPerView: 4.5,
            slidesPerGroup: 4,
          },
          1080: {
            slidesPerView: 6.2,
            slidesPerGroup: 6,
          },
          1460: {
            slidesPerView: 7.2,
            slidesPerGroup: 7,
          },
          1920: {
            slidesPerView: 8.2,
            slidesPerGroup: 8,
          },
        }}
      >
        {data?.length !== 0 &&
          data?.map((item, i) => (
            <SwiperSlide key={i}>
              <LiveTVCard id={i} item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default LiveTVSlider;
