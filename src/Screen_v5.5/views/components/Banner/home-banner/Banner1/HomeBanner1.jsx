import React, { useContext, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Autoplay, EffectCoverflow, EffectFade, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { USE_MOBILE_THEME_ONLY } from "../../../../../../api/MovieDom";
import { WindowContext } from "../../../../../../Context/WindowContextProvider";
import { img_path } from "../../../../../../tools";
import { deviceSelector } from "../../../../../redux/slices/device_slice";
import { homeSelector } from "../../../../../redux/slices/home_slice";
import { IconButton } from "../../../common/buttons/Buttons";
import TrailerSoundBtn from "../../../common/Trailer/TrailerSoundBtn";
import Image, { IMG_TYPE } from "../../../helper/Image";
import MobileBanner from "./MobileBanner";
import Slide from "./Slide";

const HomeBanner1 = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showThumns, setShowThumbs] = useState(true);
  const toggleThumbs = () => setShowThumbs((state) => !state);

  const device = useSelector(deviceSelector);
  const { banner } = useSelector(homeSelector);
  const show_mobile_slider = device.is_touch_device || device.is_small_device;

  const { handleToggleMuted } = useContext(WindowContext);

  return !!banner?.length ? (
    show_mobile_slider || USE_MOBILE_THEME_ONLY.value ? (
      <MobileBanner data={banner} />
    ) : (
      <div
        className="mdom-banner-area position-relative"
        style={{
          height: "90vh",
        }}
      >
        <Swiper
          effect={"fade"}
          modules={[EffectFade, Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          style={{ zIndex: 0 }}
          allowTouchMove={false}
          className="home-slider-one mdom-banner-slider"
        >
          {banner?.map((item, index) => (
            <SwiperSlide key={index} className="home-slide">
              {({ isActive }) => <Slide dataObj={item} isActive={isActive} />}
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="thumbs position-absolute w-30"
          style={{
            right: "30px",
            bottom: "30px",
          }}
        >
          <div className="btns d-flex flex-column justify-content-center align-items-center">
            <IconButton type="button" onClick={handleToggleMuted}>
              <TrailerSoundBtn/>
            </IconButton>
            <div
              className="d-flex gap-10 justify-content-center align-items-center"
              style={{
                transition: "all 0.3s ease 0.3s",
                opacity: showThumns ? 0 : 1,
                visibility: showThumns ? "hidden" : "visible",
              }}
            >
              <button
                type="button"
                className="btn home-banner-one-slider-pagi-next"
              >
                <i class="fas fa-angle-left"></i>
              </button>
              <button
                type="button"
                className="btn home-banner-one-slider-pagi-prev"
              >
                <i class="fas fa-angle-right"></i>
              </button>
            </div>
            <button
              type="button"
              className="btn mb-2 rounded-0"
              style={{
                background: "none",
                transition: "all .4s ease",
                transform: showThumns ? "rotateX(0deg)" : "rotateX(180deg)",
              }}
              onClick={toggleThumbs}
            >
              <i class="fas fa-angle-down"></i>
            </button>
          </div>
          <Swiper
            className="thumb-slider"
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Thumbs, EffectCoverflow, Navigation, Autoplay]}
            slidesPerView={3}
            autoplay
            spaceBetween={0}
            loop
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 50,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={{
              nextEl: ".home-banner-one-slider-pagi-next",
              prevEl: ".home-banner-one-slider-pagi-prev",
            }}
            style={{
              transition: "all .4s ease",
              maxHeight: showThumns ? 2000 : 0,
            }}
          >
            {banner?.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{
                  zIndex: 10,
                }}
              >
                <Image
                  type={IMG_TYPE.POSTER}
                  src={img_path(item, true)}
                  alt=""
                  className="rounded-1"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  ) : (
    <div
      style={{
        height: "80vh",
      }}
      className="center"
    >
      <Spinner animation="border" variant="light" />
    </div>
  );
};

export default HomeBanner1;
