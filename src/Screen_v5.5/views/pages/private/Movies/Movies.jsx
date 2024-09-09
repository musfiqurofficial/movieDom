import React from "react";
import AllPageBanner1 from "../../../components/Banner/AllPageBanner/Banner1/AllPageBanner1";
import { MOVIES_DUMMY_DATA } from "../../../../data/movies.js";
import FilterSection from "../../../components/Banner/AllPageBanner/Banner1/FilterSection";
import FilterData from "../../../components/Banner/AllPageBanner/Banner1/FilterData";
import { CONTENT_TYPE } from "../../../../const";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { resetFilter } from "../../../../redux/slices/filter_slice";

function AllMovies() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(resetFilter(CONTENT_TYPE.MOVIES));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // component will unmount;
  return (
    <>
      <figure className="pt-50">
        <h2 className="text-center">Movies</h2>
        <FilterSection type={CONTENT_TYPE.MOVIES} />
      </figure>
      <FilterData />
    </>
  );
}

const Movies = () => {

  return (
    <div>
      <AllPageBanner1 data={MOVIES_DUMMY_DATA} />
      <AllMovies />
    </div>
  );
};

export default Movies;
