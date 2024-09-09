import React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { FreeMode, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { USE_MOBILE_THEME_ONLY } from "../../../../../api/MovieDom";
import { WindowContext } from "../../../../../Context/WindowContextProvider";
import { deviceSelector } from "../../../../redux/slices/device_slice";
import Icon from "../../icons/Icons";
import CoverSlide from "../slides/CoverSlide";
import MobileSlider from "./MobileSlider";

const slider_breakpoint = {
  600: {
    slidesPerView: 3.1,
  },
  860: {
    slidesPerView: 3.5,
  },
  920: {
    slidesPerView: 4.1,
  },
  1200: {
    slidesPerView: 5.1,
  },
  1540: {
    slidesPerView: 5.1,
  },
};

const MDomCoverSlider = ({ data = [], last_slider, tv_slider }) => {
  const device = useSelector(deviceSelector);
  const show_mobile_slider = device.is_touch_device || device.is_small_device;
  const { handlePlayBanner } = useContext(WindowContext);
  return show_mobile_slider || USE_MOBILE_THEME_ONLY.value ? (
    <MobileSlider data={data} tv_episode_slider={tv_slider} />
  ) : (
    <div
      onMouseEnter={() => handlePlayBanner(false)}
      onMouseLeave={() => handlePlayBanner(true)}
    >
      <Swiper
        spaceBetween={5}
        slideClass="swiper-slide"
        allowTouchMove={true}
        breakpoints={slider_breakpoint}
        navigation={{
          nextEl: ".slider-navigation-next",
          prevEl: ".slider-navigation-prev",
        }}
        modules={[Navigation, FreeMode]}
        className={`mdom-slider mdom-cover-slider swiper-mdom-slider-type-cover container`}
      >
        {[...data].map((item, index) => (
          <SwiperSlide className={last_slider ? "last-slide" : ""}>
            <CoverSlide
              dataObj={{ ...item, id: index }}
              last_slider={last_slider}
            />
          </SwiperSlide>
        ))}
        <button className="slider-navigation-btn slider-navigation-next">
          <Icon.ArrowThinRight />
        </button>
        <button className="slider-navigation-btn slider-navigation-prev">
          <Icon.ArrowThinLeft />
        </button>
      </Swiper>
    </div>
  );
};

export default MDomCoverSlider;
