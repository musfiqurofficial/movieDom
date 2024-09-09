import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Rating from "react-rating";
import { Navigation } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { IconButton } from "../../../../components/common/buttons/Buttons";
import FixedPlayButton from "../../../../components/common/buttons/FixedPlayButton";
import BannerTrailer from "../../../../components/common/Trailer/BannerTrailer";
import FSicon from "../../../../components/icons/FSicon";

const Banner = () => {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState({ played: 0, loaded: 0 });

  return (
    <>
      <FixedPlayButton />
      <div className="single-page-banner">
        <div className="media">
          <div className="overlay"></div>
          <img
            src="https://www.themoviedb.org/t/p/w300/pO4HXIym7xiKfQ5wHhs4XaZXmsF.jpg"
            alt="movie name"
            className="backdrop"
          />
          {progress.played < 99 && (
            <div
              style={{
                opacity: playing ? 1 : 0,
                visibility: playing ? "visible" : "hidden",
                transition: "all 0.2s ease",
              }}
            >
              <BannerTrailer
                trailer="YK5hbs4LOI8"
                muted={true}
                playing={true}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onProgress={(tr) =>
                  setProgress({
                    played: tr.played * 100,
                    loaded: tr.loaded * 100,
                  })
                }
              />
            </div>
          )}
        </div>

        <div className="content">
          <Container>
            <div className="content-grid gap-20">
              <div className="content-grid-item  d-flex flex-column justify-content-flex-end">
                <h1 className="item-title text-shadow">Movie Name Here</h1>
                <table className="details-table">
                  <tbody>
                    <tr>
                      <th>Rating</th>
                      <td>
                        <Rating
                          readonly
                          emptySymbol={<FSicon.StarR className=" text-secondary" />}
                          fullSymbol={<FSicon.Star className=" text-secondary" />}
                          start={0}
                          stop={10}
                          initialRating={7.4}
                          className="d-flex gap-4 ratting text-secondary"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td>Hollywood</td>
                    </tr>
                    <tr>
                      <th>Genre</th>
                      <td>
                        <ul className="d-flex gap-6">
                          <li>
                            <a href="###" className="">
                              Horror
                            </a>
                          </li>
                          <li>
                            <a href="###" className="">
                              Horror
                            </a>
                          </li>
                          <li>
                            <a href="###" className="">
                              Horror
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th>Publish</th>
                      <td>1 April, 2022</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="d-none content-grid-item d-md-flex flex-column justify-content-flex-end align-items-center gap-10">
                <div className="btns d-flex gap-10">
                  <IconButton onClick={() => setPlaying((state) => !state)}>
                    {playing ? <FSicon.PauseS /> : <FSicon.Play />}
                  </IconButton>
                  <IconButton>
                    <FSicon.MuteS />
                  </IconButton>
                </div>
                <div
                  className="progress-bar"
                  style={{
                    "--progress": `${progress.played}%`,
                    "--loaded": `${progress.loaded}%`,
                  }}
                ></div>
              </div>
              <div  className="content-grid-item  d-flex flex-column justify-content-flex-end">
                <div className="group mb-20">
                  <h3 className="title fs-24 fw-700 letter-spacing-2 mb-10">
                    Actors
                  </h3>
                  <Swiper
                    slidesPerView={4.5}
                    spaceBetween={10}
                    modules={[Navigation]}
                    navigation={{
                      nextEl: ".single-page-actor-slider-nav-next",
                      prevEl: ".single-page-actor-slider-nav-prev",
                    }}
                  >
                    {[...Array(10)].map((_, index) => (
                      <SwiperSlide key={index}>
                        <a href="##" className="w-100">
                          <img
                            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3CrShdDQp6aR1GYy8T8zNthrUIW.jpg"
                            className="actor-img"
                            alt=""
                          />
                          <p className="name">Actor Name</p>
                        </a>
                      </SwiperSlide>
                    ))}
                    <div className="pagination">
                      <IconButton className="single-page-actor-slider-nav-prev">
                        <FSicon.ArrowLongLeft />
                      </IconButton>
                      <IconButton className="single-page-actor-slider-nav-next">
                        <FSicon.ArrowLongRight />
                      </IconButton>
                      <div className="devider"></div>
                    </div>
                  </Swiper>
                </div>

                <div className="group">
                  <h3 className="title mb-10">Short Story</h3>
                  <p className="desc mb-10">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Consequatur ut consequuntur tenetur commodi eius, expedita
                    error aperiam quis in quaerat id, nam voluptas nobis unde,
                    mollitia saepe illum deserunt corrupti? Maiores dolore
                    impedit nesciunt est commodi minima labore voluptates
                    laboriosam.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Banner;
