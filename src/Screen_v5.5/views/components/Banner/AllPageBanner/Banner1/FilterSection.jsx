import React, { useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CONTENT_TYPE } from "../../../../../const";
import {
  deleteMoviesFilter,
  deleteTvSeriesFilter,
  updateMoviesFilter,
  updateTvSeriesFilter,
} from "../../../../../redux/slices/filter_slice";
import { getCleanObj } from "../../../../../tools";
import FSicon from "../../../icons/FSicon";
import RatingFilter from "./RatingFilter";

const THIS_YEAR = new Date().getFullYear();

function selector({ type, for_movies, for_tv_series, initial }) {
  switch (type) {
    case CONTENT_TYPE.MOVIES:
      return for_movies || initial;
    case CONTENT_TYPE.TVSERIES:
      return for_tv_series || initial;
    default:
      return initial;
  }
}

const INITIAL_YEARS = [...Array(25)].map((_, i) => THIS_YEAR - i);

const FilterSection = ({ type }) => {
  const { menu, filter } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // GET QUERY PARAMETERS;
  const getQuerys = useCallback(
    () => Object.fromEntries(searchParams),
    [searchParams]
  );
  const query_obj = Object.fromEntries(searchParams);

  function paramsValueOf(property) {
    return query_obj[property] || "";
  }
  function filterValueOf(property, initialvalue = "") {
    switch (type) {
      case CONTENT_TYPE.MOVIES:
        return filter.movies[property] || initialvalue;
      case CONTENT_TYPE.TVSERIES:
        return filter.tvSeries[property] || initialvalue;

      default:
        return initialvalue;
    }
  }
  function valueOf(property) {
    return paramsValueOf(property) || filterValueOf(property);
  }

  // CHANGE FILTER
  function onChange(property, value) {
    const filters = selector({
      type,
      for_movies: filter.movies,
      for_tv_series: filter.tvSeries,
      initial: {},
    });
    let newFilter = { ...filters, [property]: value };
    if (!value) {
      delete newFilter[property];
    }
    switch (type) {
      case CONTENT_TYPE.MOVIES:
        setSearchParams(newFilter);
        !!value
          ? dispatch(updateMoviesFilter({ [property]: value }))
          : dispatch(deleteMoviesFilter(property));
        break;
      case CONTENT_TYPE.TVSERIES:
        setSearchParams(newFilter);
        !!value
          ? dispatch(updateTvSeriesFilter({ [property]: value }))
          : dispatch(deleteTvSeriesFilter(property));
        break;
      default:
        toast.error("Can't update filter.");
    }
  }

  // DELETE FILTER
  function onDelete(property) {
    delete query_obj[property];
    setSearchParams(query_obj);
    switch (type) {
      case CONTENT_TYPE.MOVIES:
        dispatch(deleteMoviesFilter(property));
        break;

      case CONTENT_TYPE.TVSERIES:
        dispatch(deleteTvSeriesFilter(property));
        break;

      default:
        break;
    }
  }

  // SELECTED FILTER
  const selectedFilter = Object.entries({
    category: valueOf("category"),
    genre: valueOf("genre"),
    year: valueOf("year"),
  });

  // SELECT CATEGORY
  const categorys = selector({
    type,
    for_movies: menu?.movies?.category || [],
    for_tv_series: menu?.tvSeries?.category || [],
    initial: [],
  });

  // SELECT GENRE
  const genre = selector({
    type,
    for_movies: menu?.movies?.genre || [],
    for_tv_series: menu?.tvSeries?.genre || [],
    initial: [],
  });

  // SELECT YEARS
  const years = selector({
    type,
    for_movies: menu?.movies?.years || INITIAL_YEARS,
    for_tv_series: menu?.tvSeries?.years || INITIAL_YEARS,
    initial: INITIAL_YEARS,
  });

  useEffect(() => {
    const query_obj = getQuerys();
    const params = {
      category: valueOf("category"),
      year: valueOf("year"),
      genre: valueOf("genre"),
    };
    setSearchParams(getCleanObj(params));
    switch (type) {
      case CONTENT_TYPE.MOVIES:
        dispatch(
          updateMoviesFilter({
            ...query_obj,
          })
        );
        break;

      case CONTENT_TYPE.TVSERIES:
        dispatch(
          updateTvSeriesFilter({
            ...query_obj,
          })
        );
        break;

      default:
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getQuerys, type]);

  // IF TYPE IS INVALID THEN RETURN  NULL
  if (!type) {
    return null;
  }

  return (
    <section className="py-20">
      <Container className="d-flex flex-column gap-20">
        <div className="filters-wrapper py-10 py-md-20 px-10 px-md-20 rounded-6">
          <select
            name="category"
            className="filter select-filter"
            value={valueOf("category")}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          >
            <option value="">Category</option>
            {categorys.map((ele, index) => (
              <>
                <option value={ele.name || ele} key={index}>
                  {ele}
                </option>
              </>
            ))}
          </select>
          <select
            name="genre"
            className="filter select-filter"
            value={valueOf("genre")}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          >
            <option value="">Genre</option>
            {genre.map((ele, index) => (
              <option value={ele} key={index}>
                {ele}
              </option>
            ))}
          </select>
          <select
            name="year"
            className="filter select-filter"
            value={valueOf("year")}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          >
            <option value="">Years</option>
            {years.map((ele, index) => (
              <option value={ele} key={index}>
                {ele}
              </option>
            ))}
          </select>
          <div className="filter">
            <RatingFilter type={type} />
          </div>
        </div>

        {/* SELECTED FILTERS */}
        <div className="selected-filters-wrapper d-flex justify-content-flex-start align-items-center gap-20">
          {selectedFilter.map(
            (item) =>
              !!item[1] && (
                <div
                  className="selected-filter  -->  py-6 px-12 rounded-6 d-flex justify-content-center align-items-center gap-10"
                  key={item[0]}
                  style={{
                    background: "#ffffff05",
                    border: "2px solid #ffffff60",
                  }}
                >
                  <span>{item[1]}</span>
                  <button
                    type="button"
                    className="mdom-bg-light-20 h-25-px w-25-px center rounded-full"
                    style={{
                      padding: "0px !important",
                    }}
                    onClick={() => onDelete(item[0])}
                  >
                    <FSicon.Xmark />
                  </button>
                </div>
              )
          )}
        </div>
      </Container>
    </section>
  );
};

export default FilterSection;
