import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper";
import { GenreCard } from "./Cards";
import { _HIT_ORIGIN } from "../tools";
const GenreSlider = () => {
  const [genre, setGenre] = useState([]);
  useEffect(() => {
    axios
      .get(`${_HIT_ORIGIN}/genre_section.json?timestamp=${new Date().getTime()}`)
      .then((res) => setGenre(res.data))
      .catch((err) => console.warn(err.message));
  }, []);

  return (
    <Swiper
      className="genre-slider"
      spaceBetween={10}
      loop={false}
      autoplay={{
        delay: 2000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
        playOnMouseLeave: true,
      }}
      modules={[Autoplay]}
      breakpoints={{
        240: {
          slidesPerView: 2.3,
        },
        360: {
          slidesPerView: 3.3,
        },
        480: {
          slidesPerView: 4.3,
        },
        520: {
          slidesPerView: 5.3,
        },
        640: {
          slidesPerView: 6.3,
        },
        760: {
          slidesPerView: 7.3,
        },
        840: {
          slidesPerView: 8.3,
        },
        940: {
          slidesPerView: 9.3,
        },
      }}
    >
      {genre?.map((item, index) => (
        <SwiperSlide key={item.name}>
          <GenreCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GenreSlider;
