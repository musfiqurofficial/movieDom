import React from "react";
import { Container } from "react-bootstrap";
import Icon from "../../../icons/Icons";
import SeriesEpisodeSlider from "./SeriesEpisodeSlider";
import { DUMMY_TV_SERIES_DATA as data } from "../../../../../data/DUMMY_TV_SERIES_DATA";
import { ButtonOne } from "../../../common/buttons/Buttons";

const TVBannerOne = () => {
  return (
    <div className="mdom-banner-area">
      <section
        className="mdom-banner mdom-banner-one"
        style={{
          background: `radial-gradient(at 10% 90%,#19063390 10%, transparent 40%) , linear-gradient(to top, #190633 5%, transparent 20%) , url(${data[0].backdrop})`,
        }}
      >
        <div className="mdom-banner-content">
          <Container>
            <h3 className="title">{data[0].title}</h3>
            <ul className="tags">
              <li className="tag active">tag 1</li>
              <li className="tag">tag 2</li>
              <li className="tag">tag 3</li>
              <li className="tag">tag 4</li>
            </ul>
            <p className="desc">
              When Steven Grant, a mild-mannered gift-shop employee, becomes
              plagued with blackouts and memories of another life, he discovers
              he has dissociative identity disorder and shares a body with
              mercenary Marc Spector.
            </p>
            <div className="btns">
              <ul className="action-btns">
                <li>
                  <button className="action-btn">
                    <Icon.Mute />
                  </button>
                </li>
                <li>
                  <button className="action-btn">
                    <Icon.Mute />
                  </button>
                </li>
                <li>
                  <button className="action-btn">
                    <Icon.Mute />
                  </button>
                </li>
              </ul>
              <ButtonOne hover_content="Play Now"> TV Series </ButtonOne>
            </div>
          </Container>
        </div>
      </section>
      <SeriesEpisodeSlider />
    </div>
  );
};

export default TVBannerOne;
