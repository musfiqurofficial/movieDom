import React from "react";
import { Col, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { light_theme } from "../../api/MovieDom";

export const SkeletonMDOMTheme = ({ children }) => (
  <SkeletonTheme
    baseColor={light_theme ? "#ddd" : "#141e30"}
    highlightColor={light_theme ? "#aaa" : "#ffffff10"}
  >
    {children}
  </SkeletonTheme>
);

export const LoadingBanner = () => {

  return (
    <SkeletonMDOMTheme>
      <section className="banner-area center">
        <div className="theme-container">
          <Row>
            <Col xs={12} md={6} lg={4}>
              <Skeleton height="40px" />
              <br />
              <Skeleton count={3} width="70%" />
              <Row className="mt-3">
                <Col xs={12} md={3}>
                  <Skeleton style={{ maxWidth: "150px" }} height="40px" />
                </Col>
                <Col xs={12} md={3}>
                  <Skeleton style={{ maxWidth: "150px" }} height="40px" />
                </Col>
              </Row>
            </Col>
            <Col>
              <LoadingSlider className="mt-5" />
            </Col>
          </Row>
        </div>
      </section>
    </SkeletonMDOMTheme>
  );
};

export const LoadingSlider = ({ className }) => {

  return (
    <SkeletonMDOMTheme>
      <Swiper
        className={className}
        slidesPerView={4.4}
        spaceBetween={10}
        breakpoints={{
          1920: {
            slidesPerView: 6.5,
          },
        }}
      >
        {[...Array(7)].map((e, i) => (
          <SwiperSlide key={i}>
            <Skeleton height="250px" />
          </SwiperSlide>
        ))}
      </Swiper>
    </SkeletonMDOMTheme>
  );
};

export const LoadingSliderSection = () => {

  return (
    <SkeletonMDOMTheme>
      <section className="loading">
        <div className="theme-container">
          <Skeleton
            height={40}
            style={{ maxWidth: "350px", width: "100%", marginBottom: "10px" }}
          />
          <LoadingSlider className="mt-2" />
        </div>
      </section>
    </SkeletonMDOMTheme>
  );
};
