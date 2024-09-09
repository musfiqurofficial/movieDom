import React from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getServerImgPath } from "../../tools";
import {
  FavouriteListButton,
  LogoOrTitle,
  ServerImage,
  WatchingButton,
} from "../SmallComponents";

const BasicSlider = ({ data = [] }) => {
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Autoplay]}
      spaceBetween={10}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
        playOnMouseLeave: true,
      }}
      className="basic-home-banner-slider"
    >
      {[...data].map((item, index) => (
        <SwiperSlide key={index}>
          <div className="overlay">
            <ServerImage
              src={getServerImgPath(
                item.MovieID,
                item.backdrops_Poster,
                "movie",
                "screen",
                true
              )}
              type="screen"
              className="background-image"
            />
          </div>
          <div className="theme-container">
            <LogoOrTitle id={item.MovieID}>
              <h3 className="title">
                {item.MovieTitle || item.TVtitle} 
                <span className="year">({" "}{item.MovieYear} )</span>
              </h3>
            </LogoOrTitle>
            <ul className="tags">
              <li className="tag active">
                {item.MovieCategory || item.TVcategory}
              </li>
              {[...item?.MovieGenre?.trim()?.split(",")].map(
                (genre_item) =>
                  genre_item && <li key={genre_item} className="tag">{genre_item}</li>
              )}
            </ul>
            <p className="desc text-in-two">{item.MovieStory}</p>
            <div className="btns">
              <ul className="btn-actions">
                <FavouriteListButton
                  dataObj={item}
                  placement="top"
                  className="btn-action"
                />
              </ul>
              <WatchingButton MovieID={item.MovieID} className="btn-play" />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BasicSlider;
