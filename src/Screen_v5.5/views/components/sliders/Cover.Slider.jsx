import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { USE_MOBILE_THEME_ONLY } from "../../../../api/MovieDom";
import Icon from "../icons/Icons";
import MDomCoverSlider from "./MDomSliders/MDomCoverSlider";

const CoverSlider = ({ last_slider = false,title, more,data=[] }) => {
  return (
    <div
      className={`py-10 ${ USE_MOBILE_THEME_ONLY.value?'':'slider-section'}`}
    >
      <Container>
        <div className="slider-header">
          <h3 className="title mb-20 d-flex align-items-flex-end">
            <span className="icon mr-10">
              <Icon.Stack size="35" />
            </span>
            <span className="text fs-30 fw-500">{title}</span>
            <NavLink to={more} className="more-btn fs-18 fw-600">
              More <i class="fas fa-angles-right"></i>
            </NavLink>
          </h3>
        </div>
      </Container>
      <MDomCoverSlider data={data} last_slider={last_slider} />
    </div>
  );
};

export default CoverSlider;
