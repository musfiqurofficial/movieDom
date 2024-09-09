import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ButtonOne, IconButton } from "../../../common/buttons/Buttons";
import BannerTrailer from "../../../common/Trailer/BannerTrailer";
import FSicon from "../../../icons/FSicon";
import { useSelector } from "react-redux";
import Image, { IMG_TYPE } from "../../../helper/Image";

const Banner = ({ dataObj = {} }) => {
  const [progress, setProgress] = useState({ played: 0, loaded: 0 });
  const [playTrailer, setPlayTrailer] = useState(true);
  const [isplaying, setIsPlaying] = useState(false);

  const { is_small_device } = useSelector(
    (store) => store.device
  );

  const handlePlayPauseReplay = () => {
    if (progress.played < 99) {
      setPlayTrailer((state) => !state);
    } else {
      setProgress({ played: 0, loaded: 0 });
    }
  };

  return (
    <div
      className="mdom-banner-area position-relative"
      style={{
        height: "90vh",
        overflow: "hidden",
      }}
    >
      <div className="mdom-banner">
        <div className="media">
          <Image
            type={IMG_TYPE.BACKDROP}
            src={
              is_small_device
                ? "https://www.themoviedb.org/t/p/w300/zzXFM4FKDG7l1ufrAkwQYv2xvnh.jpg"
                : "https://www.themoviedb.org/t/p/w300/eG0oOQVsniPAuecPzDD1B1gnYWy.jpg"
            }
            alt="the ice movie "
            className="backdrop"
          />
          <div
            style={{
              opacity: 1,
              transition: "opacity 0.3s ease",
            }}
          >
            {!is_small_device &&
              dataObj.trailer &&
              progress.played < 99 &&
              playTrailer && (
                <div
                  style={{
                    opacity: isplaying ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <BannerTrailer
                    trailer={"0U0L4uT0btQ"}
                    muted={true}
                    playing={true}
                    onProgress={(tr) =>
                      setProgress({
                        played: tr.played * 100,
                        loaded: tr.loaded * 100,
                      })
                    }
                    onPlay={() => {
                      setIsPlaying(true);
                    }}
                    onEnded={() => {
                      setIsPlaying(false);
                    }}
                    onPause={() => {
                      setIsPlaying(false);
                    }}
                    onError={() => {
                      setIsPlaying(false);
                    }}
                    onBufferStart={() => {
                      setIsPlaying(false);
                    }}
                    onBufferEnd={() => {
                      setIsPlaying(true);
                    }}
                  />
                </div>
              )}
          </div>
        </div>
        <Container>
          <Row className="gap-15 justify-content-between align-items-end">
            <Col xs={12} md={4}>
              <div className="overview mb-50">
                {/* <h2 className="title  mb-10">
                {dataObj.title} ({dataObj.year})
              </h2> */}
                <img
                  src={dataObj.logo}
                  alt={dataObj.title}
                  className="banner-logo"
                />
                <h1>{is_small_device ? "Mobile" : "DESKTOP"}</h1>
                <ul className="tags mb-10">
                  {[...Array(4)].map((item, index) => (
                    <li key={index}>
                      <a href="##" className="tag">
                        tag
                      </a>
                    </li>
                  ))}
                </ul>
                <p
                  className="desc"
                  style={{
                    transform: isplaying ? "scale(1)" : "scale(1)",
                    transformOrigin: "bottom left",
                    transition: "0.2s ease",
                  }}
                >
                  <b>{isplaying ? "Play " : "pause "}</b>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                  facere nobis molestiae illo voluptas, odit dolores porro
                  nulla. Ducimus earum accusamus dolorem facilis exercitationem
                  quasi est quis, cupiditate eveniet voluptatibus.
                </p>
                <div className="btns  mb-10">
                  <ul className="action-btns d-flex gap-10 flex-row">
                    {[
                      {
                        name: "Favourite",
                        action: () => console.log("actin_btn_function"),
                        active_icon: <FSicon.HeartS />,
                        inactive_icon: <FSicon.HeartR />,
                      },
                      {
                        name: "Bookmark",
                        action: () => console.log("actin_btn_function"),
                        active_icon: <FSicon.BookmarkS />,
                        inactive_icon: <FSicon.BookmarkR />,
                      },
                    ].map((item, index) => (
                      <li key={index}>
                        <button
                          className="h-40-px w-40-px fs-18 center mdom-bg-primary rounded-full"
                          onClick={item.action}
                        >
                          {item.inactive_icon}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <ButtonOne hover_content="Play now">Movie</ButtonOne>
                </div>
              </div>
            </Col>
            <Col xs={12} md={4}>
              {!is_small_device && (
                <div className="trailer-controller mb-50">
                  <div
                    className="progress-bar"
                    style={{
                      "--progress": `${progress.played}%`,
                      "--loaded": `${progress.loaded}%`,
                      width: "auto",
                    }}
                  ></div>
                  <div className="btns">
                    <IconButton type="button" onClick={handlePlayPauseReplay}>
                      {progress.played < 99 ? (
                        <FSicon.Play />
                      ) : (
                        <FSicon.RotateLeft />
                      )}
                    </IconButton>
                    <IconButton type="button">
                      <FSicon.MuteS />
                    </IconButton>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Banner;
