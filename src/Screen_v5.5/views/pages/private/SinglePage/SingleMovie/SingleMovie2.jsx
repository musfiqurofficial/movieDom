import React from "react";
import { MOVIES_DUMMY_DATA } from "../../../../../data/movies";
import CoverSlider from "../../../../components/sliders/Cover.Slider";
import MDomCoverSlider from "../../../../components/sliders/MDomSliders/MDomCoverSlider";
import Banner2 from "../Common/Banner2";

const SingleMovie2 = () => {
  return (
    <div  className="mb-50">
      <Banner2 />
      <MDomCoverSlider data={MOVIES_DUMMY_DATA} />
      <CoverSlider data={MOVIES_DUMMY_DATA} />
      <CoverSlider data={MOVIES_DUMMY_DATA} />
    </div>
  );
};

export default SingleMovie2;
