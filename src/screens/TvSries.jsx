import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";
import AllPageBanner from "../components/AllPageComponents/AllPageBanner";
import AllPageFilteredData from "../components/AllPageComponents/AllPageFilteredData";
import AllPageFilterSection from "../components/AllPageComponents/AllPageFilterSection";
import useMenu from "../Hook/useMenu";
import useLS from "../Hook/useLS";
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
import { GoToTopButton } from "../components/SmallComponents";
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

const TvSries = () => {
  const [sort_by, setSort_by] = useState("DESC");
  const [bannerDataType, setBannerDataType] = useState();
  const [filterMethods, setFilterMethods] = useState(initialFilter);
  const { menu } = useMenu();
  // const {notDesktop}=useContext()
  // handlers
  const handleTVsFilters = (property, value) => {
    setFilterMethods((state) => ({ ...state, [property]: value }));
  };

  const { data } = useContext(DataContext);
  const [choice, setChoice] = useState("portrait");
  const { data: LSData, updateLS } = useLS();
  const location = useLocation();
  const filter_section_ref = useRef(null);
  const { notDesktop } = useContext(WindowContext);
  const { appName } = useSite();

  // -----
  useEffect(() => {
    if (LSData.cardType) {
      setChoice(LSData.cardType);
    } else {
      updateLSDB("settings", { cardType: choice });
    }
  }, [LSData, choice]);
  useEffect(() => (document.title = `${appName || ""}-TV Series`), [appName]);

  useLayoutEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <div
        className="min-80vh"
        id="all_page"
        style={{ marginTop: location.search ? 100 : "" }}
      >
        <GoToTopButton />
        {notDesktop ? (
          <MovileBannerSlider datas={data?.tvs?.recent} type="tv" />
        ) : (
          !location.search && (
            <>
              <select
                name="categories"
                className="select-option"
                onChange={(e) => setBannerDataType(e.target.value)}
              >
                {menu?.tvs?.genre?.length !== 0 &&
                  menu?.tvs?.genre?.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <AllPageBanner type="tv" filter={bannerDataType} />
            </>
          )
        )}
        <ContinueWatchingSlider dataType="tv-series" className="mt-4" />

        <FilterContextProvider>
          <div ref={filter_section_ref}>
            <AllPageFilterSection
              title="TV Series"
              type="tv"
              handleTVsFilters={handleTVsFilters}
              filters={filterMethods}
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
            type="tv-series"
            filters={filterMethods}
            choice={choice}
            sort_by={sort_by}
            filterHanlder={handleTVsFilters}
          />
        </FilterContextProvider>
      </div>
    </>
  );
};

export default TvSries;
