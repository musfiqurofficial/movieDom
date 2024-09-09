import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deviceSelector } from "../../../../redux/slices/device_slice";
import Image, { IMG_TYPE } from "../../helper/Image";
import FSicon from "../../icons/FSicon";
import { IconButton } from "../buttons/Buttons";

const STYLES = {
  LEFT_SIDE_STYLES: {
    right: "100%",
    left: "",
  },
  RIGHT_SIDE_STYLES: {
    right: "",
    left: "100%",
  },
  TOP_SIDE_STYLES: {
    left: "50%",
    right: "",
    bottom: "100%",
    transform: "translateX(-50%)",
  },
};

const PosterHoverCoverCard = ({dataObj}) => {
  const [hover, setHover] = useState(false);
  const card_ref = useRef(null);
  const hover_card_ref = useRef(null);
  const [cardStyle, setCardStyle] = useState({});
  const [isBottom, setIsBottom] = useState(false);
  const { is_small_device } = useSelector(deviceSelector);

  useEffect(() => {
    const total_height_of_window = document.body.offsetHeight;
    const total_width_of_window = document.body.offsetWidth;
    const card_width = card_ref?.current?.offsetWidth;
    const hover_card_width = hover_card_ref?.current?.offsetWidth;
    const hover_card_height = hover_card_ref?.current?.offsetHeight;
    const offset_left = card_ref?.current?.offsetLeft;
    const offset_right = total_width_of_window - (offset_left + card_width);
    const offset_top = card_ref?.current?.offsetTop;
    const remain_space_in_bottom = total_height_of_window - offset_top;
    const is_bottom = remain_space_in_bottom < hover_card_height;

    const has_space_in_left = offset_left > hover_card_width;
    const has_space_in_right = offset_right > hover_card_width;

    if (has_space_in_left) {
      // SHOW TO LEFT
      setCardStyle(STYLES.LEFT_SIDE_STYLES);
    } else if (has_space_in_right) {
      // SHOT TO RIGHT
      setCardStyle(STYLES.RIGHT_SIDE_STYLES);
    } else {
      //SHOW TO TOP
      setCardStyle(STYLES.TOP_SIDE_STYLES);
    }

    setIsBottom(is_bottom);
    // console.log({
    //   rW: offset_right < hover_card_width,
    //   lw: offset_left < hover_card_width,
    //   righted: offset_right < offset_left,
    //   res: offset_right < hover_card_width || offset_left < hover_card_width,
    // });
  }, [hover]);

  if (is_small_device) {
    return (
      <NavLink to="/movies/single" className="w-100">
        <Image type={IMG_TYPE.POSTER} src={dataObj?.poster || "https://www.themoviedb.org/t/p/w300/nO9gTGDNdYnPr9ILKNQmk6EVTVR.jpg"} className='rounded-3' />
      </NavLink>
    );
  }

  return (
    <div
      ref={card_ref}
      className="poster-hover-card"
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="initial-content">
        <a href="##" style={{ width: "100%" }}>
          <img
            src={dataObj?.poster || "https://www.themoviedb.org/t/p/w300/nO9gTGDNdYnPr9ILKNQmk6EVTVR.jpg"}
            alt="movie_name"
            className="poster-img"
          />
          <svg className="circle-border">
            <circle cx={25} cy={25} r={25} />
          </svg>
          <IconButton
            className="position-absolute top-50 left-50"
            style={{
              transform: "translate(-50%,-50%)",
              zIndex: 1,
            }}
          >
            <FSicon.Play />
          </IconButton>
        </a>
      </div>
      {!is_small_device && (
        <div
          ref={hover_card_ref}
          className="hover-content position-absolute mdom-bg-dark  rounded-6"
          style={{
            zIndex: 5,
            bottom: isBottom ? "0%" : "50%",
            transform: isBottom ? `translateY(0%)` : "translateY(50%)",
            transition: "all 0.2s ease ",
            width: "160%",
            transitionDelay: hover ? "0.6s" : "0s",
            opacity: hover ? 1 : 0,
            visibility: hover ? "visible" : "hidden",
            overflow: "hidden",
            boxShadow: "0 20px 30px -15px #000000",
            ...cardStyle,
          }}
        >
          <div
            className="media position-relative"
            style={{ overflow: "hidden" }}
          >
            <IconButton
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                zIndex: 2,
              }}
            >
              <FSicon.SoundS />
            </IconButton>
            <img
              src="https://www.themoviedb.org/t/p/w300/nHS1U0yaaWV0rbcL0MHzZxW2gCZ.jpg"
              alt=""
              className="backdrop"
            />
            {/* {hover && (
              <BannerTrailer
                trailer="ToEp--KcXcA"
                playing={hover}
                muted={!hover}
              />
            )} */}
          </div>
          <div className="body p-10">
            <ul className="d-flex justify-content-between align-items-center gap-10 mb-5">
              <li className="fs-18 fw-bold mdom-color-highlight">
                <FSicon.Star className="mdom-color-highlight" /> 7.8
              </li>
              <li className="fs-18 fw-bold mdom-color-highlight">
                <FSicon.ClockS /> 1h 45m
              </li>
            </ul>

            <h3 className="title fs-20 letter-spacing-1 fw-600 mdom-color-light mb-5">
              Movie Name
            </h3>
            <ul className="tags d-flex gap-10 mb-5">
              <li>
                <a href="##" className="tag fs-14">
                  tag
                </a>
              </li>
              <li>
                <a href="##" className="tag fs-14">
                  tag
                </a>
              </li>
              <li>
                <a href="##" className="tag fs-14">
                  tag
                </a>
              </li>
            </ul>
            <p className="desc mb-5 text-in-two">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              dolores reiciendis quisquam voluptatem fugiat. Minus, libero.
              Tempora quibusdam voluptate illum?
            </p>
            <div className="btns mb-5 gap-10 d-flex">
              <IconButton>
                <FSicon.Play />
              </IconButton>
              <IconButton>
                <FSicon.HeartS />
              </IconButton>
              <IconButton>
                <FSicon.BookmarkS />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PosterHoverCoverCard;
