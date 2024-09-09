import React from "react";
import { EffectCube } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MOVIES_DUMMY_DATA } from "../../../../data/movies";
import "swiper/css/effect-cube";

const MobileBanner1 = () => {
  return (
    <div className="d-block d-md-none pb-50">
      <Swiper
        effect={"cube"}
        grabCursor
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination
        modules={[EffectCube]}
        className="pb-50"
        loop
        autoplay
      >
        {MOVIES_DUMMY_DATA.map((item) => (
          <SwiperSlide className="mdom-bg-dark text-center"
          >
              <img src={item.poster} alt="" className="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileBanner1;
