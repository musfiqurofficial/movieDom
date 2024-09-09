import React, { useRef } from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { FreeMode, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { USE_MOBILE_THEME_ONLY } from "../../../../../api/MovieDom";
import { WindowContext } from "../../../../../Context/WindowContextProvider";
import { deviceSelector } from "../../../../redux/slices/device_slice";
import Icon from "../../icons/Icons";
import ExpendSlide from "../slides/ExpendSlide";
import MobileSlider from "./MobileSlider";

const MDomExpextSlider = ({ data = [], tv_slider }) => {
  const swiper_slider = useRef(null);
  const device = useSelector(deviceSelector);
  const show_mobile_slider = device.is_touch_device || device.is_small_device;
  const { handlePlayBanner } = useContext(WindowContext);
  return show_mobile_slider ||  USE_MOBILE_THEME_ONLY.value ? (
    <MobileSlider data={data} />
  ) : (
    <div
      onMouseEnter={() => handlePlayBanner(false)}
      onMouseLeave={() => handlePlayBanner(true)}
    >
      <Swiper
        ref={swiper_slider}
        slidesPerView={"auto"}
        spaceBetween={5}
        slideClass="swiper-slide"
        slidesPerGroup={3}
        modules={[Navigation, FreeMode]}
        navigation={{
          nextEl: ".slider-navigation-next",
          prevEl: ".slider-navigation-prev",
        }}
        className="mdom-slider mdom-expend-slider swiper-mdom-slider-type-expend  container"
      >
        {data?.map((item, index) => (
          <SwiperSlide>
            <ExpendSlide dataObj={item} backdrop={tv_slider} />
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

export default MDomExpextSlider;
