import React from "react";
import { MOVIES_DUMMY_DATA } from "../../../../../data/movies";
import CoverSlider from "../../../../components/sliders/Cover.Slider";
import MDomCoverSlider from "../../../../components/sliders/MDomSliders/MDomCoverSlider";
import Banner from "../Common/Banner";

const SingleMovie = () => {
  return (
    <div className="mb-50">
      <Banner />
      <MDomCoverSlider data={MOVIES_DUMMY_DATA} />
      <CoverSlider data={MOVIES_DUMMY_DATA} />
      <CoverSlider data={MOVIES_DUMMY_DATA} />
    </div>
  );
};

export default SingleMovie;
