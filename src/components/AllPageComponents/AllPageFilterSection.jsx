import React, { useContext, useEffect, useState } from "react";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import ReactSlider from "react-slider";
import useMenu from "../../Hook/useMenu";
import { useSearchParams } from "react-router-dom";
import {
  IoCloseSharp,
  IoPhoneLandscape,
  IoPhonePortrait,
} from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
import { Button, ButtonGroup } from "react-bootstrap";
import { FilterContext } from "../../Context/FilterContextProvider";
import { WindowContext } from "../../Context/WindowContextProvider";
import { getTruthyObject } from "../../tools";

const RattingSlider = () => {
  const { filterState, appFilter } = useContext(FilterContext);
  return (
    <div className="rating-by d-flex">
      <div className="">
        <span className="h-6 me-1 fw-bold">
          {filterState.minrating} - {filterState.maxrating}
        </span>
        <i className="fa fa-star"></i>
      </div>
      <div className="price-by">
        <ReactSlider
          min={0}
          max={10}
          value={[filterState.minrating, filterState.maxrating]}
          onAfterChange={(newRating) =>
            appFilter({
              minrating: newRating[0],
              maxrating: newRating[1],
            })
          }
          className="rating-slider"
          thumbClassName="rating-range-thumb"
          trackClassName="rating-range-tranck"
          renderThumb={(props, state) => <div {...props}></div>}
        />
      </div>
    </div>
  );
};

const Selection = ({ filterName, items = [] }) => {
  if (!filterName) {
    console.warn("set the filter name");
  }

  const { filterState, appFilter } = useContext(FilterContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const previousSearch = Object.fromEntries([...searchParams]);

  useEffect(() => {
    appFilter({
      ...previousSearch,
    });
    setSearchParams({ ...previousSearch });
  }, []);
  useEffect(() => {
    const search_param_filters = {
      year: filterState.year,
      genre: filterState.genre,
      category: filterState.category,
      quality: filterState.quality,
    };
    setSearchParams(getTruthyObject(search_param_filters));
  }, [filterState]);
  return (
    <select
      name={filterName}
      value={filterState[filterName]}
      onChange={(e) => {
        appFilter({
          [filterName]: e.target.value,
        });
        setSearchParams({ ...previousSearch, [filterName]: e.target.value });
      }}
    >
      {[filterName, ...items].map((item, i) => (
        <option key={i} value={i === 0 ? "" : (item.name||item.year)}>
          {item.name || item.menu_name || item || item.year}
        </option>
      ))}
    </select>
  );
};

const CharacterSlider = () => {
  const { filterState, appFilter } = useContext(FilterContext);
  const [selectedItem, setSelecteditem] = useState(filterState.search);
  useEffect(() => {
    appFilter({ search: selectedItem });
  }, [selectedItem]);
  return (
    <div className="filter-menu-az">
      {[
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() =>
            setSelecteditem(filterState.search === item ? "" : item)
          }
          className={item === filterState.search ? "active" : ""}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

const SortBytton = () => {
  const { filterState, appFilter } = useContext(FilterContext);
  const [desc, setDesc] = useState(
    filterState.sort_by === "DESC" ? true : false
  );
  useEffect(() => {
    appFilter({ sort_by: desc ? "DESC" : "ASC" });
  }, [desc]);
  return (
    // <button type="button" onClick={() => setDesc((state) => !state)}>
    //   {desc ? "Letest" : "Oldest"}
    // </button>
    <></>
  );
};

const FilteredTabs = () => {
  const { filterState, removeFilter } = useContext(FilterContext);
  return (
    <div className="filtered-items">
      {Object.values(filterState).filter((value) => Boolean(value))?.length >=
        3 && <BsArrowRight style={{ strokeWidth: 2 }} />}
      {Object.keys(filterState).map(
        (e, i) =>
          Boolean(filterState[e]) &&
          e !== "maxrating" &&
          e !== "minrating" &&
          e !== "page" &&
          e !== "sort_by" && (
            <div className="filtered-item" key={e}>
              <span>{filterState[e]}</span>
              <button onClick={() => removeFilter(e)}>
                <IoCloseSharp />
              </button>
            </div>
          )
      )}
    </div>
  );
};

const CardStyle = ({ choice, hanldeChoice }) => {
  return (
    <ButtonGroup>
      <Button
        className={choice === "portrait" ? "active" : ""}
        onClick={() => {
          hanldeChoice("portrait");
        }}
      >
        <IoPhonePortrait />
      </Button>
      <Button
        className={choice === "landscape" ? "active" : ""}
        onClick={() => {
          hanldeChoice("landscape");
        }}
      >
        <IoPhoneLandscape />
      </Button>
    </ButtonGroup>
  );
};

const AllPageFilterSection = ({
  type = "",
  filters = {},
  title = "",
  choice,
  hanldeChoice,
}) => {
  const [searchParams] = useSearchParams();
  const { appFilter } = useContext(FilterContext);
  const previousSearch = Object.fromEntries([...searchParams]);
  const { menu } = useMenu();
  const { notDesktop } = useContext(WindowContext);
  useEffect(() => {
    appFilter({ ...previousSearch });
  }, [searchParams]);

  return (
    <section
      className="all-page-filter-section movie-filter-area"
      id="filter-section"
    >
      <div className="theme-container">
        <div className="section-header-style">
          <div className="d-flex">
            <i className="fas fa-photo-video me-2"></i>
            <h4>{title}</h4>
          </div>
          {Object.keys(filters)?.length !== 0 && <FilteredTabs />}
        </div>
        <div className="filter-content">
          <div className="sort-by">
            <div className="filter-group">
              <span>Sort By :</span>
              <ul className="group-list">
                <li>
                  <SortBytton />
                </li>
                {menu?.movies?.categories?.length !== 0 && (
                  <li>
                    <Selection
                      filterName="year"
                      items={
                        type.includes("movie")
                          ? menu.movies.years
                          : menu.tvs.years
                      }
                    />
                  </li>
                )}
                {menu?.movies?.categories?.length !== 0 && (
                  <li>
                    <Selection
                      filterName="category"
                      items={
                        type.includes("movie")
                          ? menu.movies.categories
                          : menu.tvs.categories
                      }
                    />
                  </li>
                )}
                {menu?.movies?.genre?.length !== 0 && (
                  <li>
                    <Selection
                      filterName="genre"
                      items={
                        type.includes("movie")
                          ? menu.movies.genre
                          : menu.tvs.genre
                      }
                    />
                  </li>
                )}
                {menu?.movies?.quality?.length !== 0 && (
                  <li>
                    <Selection
                      filterName="quality"
                      items={
                        type.includes("movie")
                          ? menu.movies.quality
                          : menu.tvs.quality
                      }
                    />
                  </li>
                )}
                <li>
                  <RattingSlider />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="charecter-and-card-box">
          <CharacterSlider />
          {!notDesktop && (
            <CardStyle choice={choice} hanldeChoice={hanldeChoice} />
          )}
        </div>
      </div>
    </section>
  );
};

export default AllPageFilterSection;
