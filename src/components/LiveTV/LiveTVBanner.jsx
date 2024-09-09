import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const LiveTVBanner = () => {
  return (
    <div className="banner-area live-tv-banner">
      <Swiper className="banner-slides">
        {[...Array(10)].map((_, i) => (
          <SwiperSlide
            style={{
              background:
                "url('https://www.themoviedb.org/t/p/w300/m7SBIIL6Y6Df6a8oqWwHzWLzo80.jpg')",
              objectFit: "cover",
            }}
          >
            <div className="theme-container">
              <h1 className="text-light">{i}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LiveTVBanner;
