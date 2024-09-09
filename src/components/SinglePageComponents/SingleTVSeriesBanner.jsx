import React from "react";
import FeaturedSection from "../HomeComponents/FeaturedSection";

const SingleTVSeriesBanner = ({dataObj}) => {
  return (
    <FeaturedSection dataObj={dataObj} />
  );
};

export default React.memo(SingleTVSeriesBanner);
