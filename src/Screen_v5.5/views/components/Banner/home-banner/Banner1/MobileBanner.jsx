import React from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MobileBannerSlide from "./MobileBannerSlide";

const MobileBanner = ({ data =[] }) => {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      slidesPerView={1}
      loop
      autoplay
      modules={[Autoplay]}
      className="mySwiper"
    >
      {data.map((ele, key) => (
        <SwiperSlide key={key}>
          <MobileBannerSlide dataObj={ele} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MobileBanner;
