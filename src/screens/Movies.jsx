import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { useEffect } from "react";
import AllPageBanner from "../components/AllPageComponents/AllPageBanner";
import AllPageFilteredData from "../components/AllPageComponents/AllPageFilteredData";
import AllPageFilterSection from "../components/AllPageComponents/AllPageFilterSection";
import useLS from "../Hook/useLS";
import useMenu from "../Hook/useMenu.js";
import { GoToTopButton } from "../components/SmallComponents";
import { updateLSDB } from "../api/localStore";
import FilterContextProvider from "../Context/FilterContextProvider";
import { WindowContext } from "../Context/WindowContextProvider";
import {
  ContinueWatchingSlider,
  MovileBannerSlider,
} from "../components/SliderSection";
import { DataContext } from "../Context/DataContextProvider";
import { scrollToTop } from "../tools";
import { useLocation } from "react-router-dom";
import useSite from "../Hook/useSite";
const initialFilter = {
  page: 1,
  year: "",
  search: "",
  category: "",
  genre: "",
  minrating: 0,
  maxrating: 10,
};
const Movies = () => {
  const { notDesktop } = useContext(WindowContext);
  // states
  const [sort_by, setSort_by] = useState("DESC");
  const [filterMethods, setFilterMethods] = useState(initialFilter);
  const [bannerDataType, setBannerDataType] = useState("Hollywood");
  const { menu } = useMenu();
  const { data } = useContext(DataContext);
  const filter_section_ref = useRef(null);
  const location = useLocation();
  const {appName}=useSite();
  // handlers
  const handleMoviesFilters = (property, value) => {
    setFilterMethods((state) => ({ ...state, [property]: value }));
  };

  const [choice, setChoice] = useState("portrait");
  const { data: LSData, updateLS } = useLS();
  useEffect(() => {
    document.title = `${appName || ''}-Movies`;
  }, [appName]);
  useLayoutEffect(() => {
    scrollToTop();
  }, []);
  // -----
  useEffect(() => {
    if (LSData.cardType) {
      setChoice(LSData.cardType);
    } else {
      updateLSDB("settings", { cardType: choice });
    }
  }, [LSData, choice]);

  return (
    <>
      <div
        className={`min-80vh`}
        id="all_page"
        style={{ marginTop: location.search ? 100 : "" }}
      >
        <GoToTopButton />
        {notDesktop
          ? data?.movies?.recent?.length !== 0 && (
              <MovileBannerSlider datas={data?.movies?.recent} type="movie" />
            )
          : !location.search && (
              <>
                <select
                  name="categories"
                  className="select-option"
                  onChange={(e) => setBannerDataType(e.target.value)}
                >
                  {menu?.movies?.categories?.length !== 0 &&
                    menu?.movies?.categories?.map((item, i) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
                <AllPageBanner type="movie" filter={bannerDataType} />
              </>
            )}

        <ContinueWatchingSlider dataType="movies" className="mt-4" />

        <FilterContextProvider>
          <div ref={filter_section_ref}>
            <AllPageFilterSection
              handleMoviesFilters={handleMoviesFilters}
              filters={filterMethods}
              title="Movies"
              type="movies"
              sort_by={sort_by}
              choice={choice}
              hanldeChoice={(value) => {
                setChoice(value);
                updateLS("settings", { cardType: value });
              }}
              onToggleSort_by={(state) => setSort_by(state)}
            />
          </div>
          <AllPageFilteredData
            type="movies"
            choice={choice}
            sort_by={sort_by}
            filterHanlder={handleMoviesFilters}
            filters={filterMethods}
          />
        </FilterContextProvider>
      </div>
    </>
  );
};

export default Movies;
