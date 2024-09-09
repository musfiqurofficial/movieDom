import React from "react";
import AllPageBanner1 from "../../../components/Banner/AllPageBanner/Banner1/AllPageBanner1";
import FilterSection from "../../../components/Banner/AllPageBanner/Banner1/FilterSection";
import FilterData from "../../../components/Banner/AllPageBanner/Banner1/FilterData";
import { CONTENT_TYPE } from "../../../../const";
import { DUMMY_TV_SERIES_DATA } from "../../../../data/DUMMY_TV_SERIES_DATA";

function AllTvSeries() {
  return (
    <>
      <figure className="pt-50">
        <h2 className="text-center">TV Series</h2>
        <FilterSection  type={CONTENT_TYPE.TVSERIES}/>
      </figure>
      <FilterData />
    </>
  );
}

const TvSeries = () => {
  return (
    <div>
      <AllPageBanner1 data={DUMMY_TV_SERIES_DATA} />
      <AllTvSeries />
    </div>
  );
};

export default TvSeries;
