import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { IconButton } from "../../../../components/common/buttons/Buttons";
import BannerTrailer from "../../../../components/common/Trailer/BannerTrailer";
import FSicon from "../../../../components/icons/FSicon";

const Banner2 = () => {
  return (
    <div className="single-page-banner">
      <div className="media">
        <div className="overlay"></div>
        <img
          src="https://www.themoviedb.org/t/p/w300/7NxVD2L10AGD73FNL8l2kxXn2hk.jpg"
          alt="movie name"
          className="backdrop"
        />
        <div
          style={{
            transition: "all 0.2s ease",
          }}
        >
          <BannerTrailer trailer="YK5hbs4LOI8" muted={true} playing={true} />
        </div>
      </div>
      <div className="content h-100" style={{ paddingTop: 100 }}>
        <Container>
          <Row xs={1} md={2} className="h-100">
            <Col>
              <Row>
                <Col xs={8} md={4}>
                  <img
                    src="https://www.themoviedb.org/t/p/w300/2S4NZshqoCEf8yHxjuqQ2HNoMaH.jpg"
                    alt=""
                    className="rounded-3 shadow"
                  />
                </Col>
                <Col xs={12} md={8}>
                  <div>
                    <ul className="tags d-flex gap-10">
                      <li className="tag highlight">tag</li>
                      <li className="tag highlight">tag</li>
                    </ul>
                    <h2 className="title">Movie Title</h2>
                    <ul className="tags d-flex gap-10">
                      <li>
                        <a href="##" className="tag highlight">
                          tag
                        </a>
                      </li>
                      <li>
                        <a href="##" className="tag">
                          tag
                        </a>
                      </li>
                      <li>
                        <a href="##" className="tag">
                          tag
                        </a>
                      </li>
                    </ul>
                    <p className="desc">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ullam perspiciatis suscipit aliquid veniam, mollitia,
                      repudiandae vitae velit quas odit sint neque fuga sunt
                      dicta inventore!
                    </p>
                    <div className="btns d-flex gap-10">
                      <IconButton className="dark">
                        <FSicon.BookmarkS className="text-secondary"/>
                      </IconButton>
                      <IconButton  className="dark">
                        <FSicon.HeartS />
                      </IconButton>
                      <Button className="rounded-full fw-600 primary-gradient">
                        Play Now <FSicon.Play />
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="cast-slider mt-20">
                <h4 className="slider-title letter-spacing-1 fw-700">CAST</h4>
                <Swiper
                  slidesPerView={6}
                  spaceBetween={10}
                  modules={[Navigation]}
                  navigation={{
                    nextEl: "",
                    prevEl: "",
                  }}
                >
                  {[...Array(10)].map((_, index) => (
                    <SwiperSlide className="text-center">
                      <img
                        src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5vV52TSEIhe4ZZLWwv3i7nfv8we.jpg"
                        alt=""
                        style={{
                          aspectRatio: 1,
                        }}
                        className="object-cover rounded-full"
                      />
                      <p className="">Cast Name</p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Col>
            <Col className="d-flex align-items-center flex-column gap-15">
              <IconButton
                size={100}
                icon_size={40}
                className=" glowing-btn primary-gradient"
              >
                <FSicon.Play />
              </IconButton>
              <IconButton className="dark">
                <FSicon.MuteS />
              </IconButton>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Banner2;
