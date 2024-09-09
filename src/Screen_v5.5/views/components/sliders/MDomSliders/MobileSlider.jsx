import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MobileSlide from "../slides/MobileSlide";



const MobileSlider = ({data=[],tv_episode_slider}) => {
    const onEpiSlider=(epi_card,normal_card)=>tv_episode_slider?epi_card:normal_card;
    const breakpoints={
        200: {
          slidesPerView:onEpiSlider(1.2, 2.2),
        },
        360: {
          slidesPerView: onEpiSlider(1.6, 3.2),
        },
        480: {
          slidesPerView: onEpiSlider(2.2, 4.2),
        },
        680: {
          slidesPerView: onEpiSlider(3.2, 5.2),
        },
      }
  return (
    <Swiper
      breakpoints={breakpoints}
      spaceBetween={5}
      className="mdom-slider container"
    >
        {data?.map(item=>(
            <SwiperSlide style={{height:"auto"}} className='mobile-slide'>
                <MobileSlide dataObj={item}  tv_backdrop={tv_episode_slider} />
            </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default MobileSlider;
