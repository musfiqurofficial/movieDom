import React, { useContext, useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MovieDom from "../api/MovieDom";
import NotFound from "../components/NotFound";
import SingleTVSeries from "../components/SinglePageComponents/SingleTVSeriesBanner";
import { VerticalSlider } from "../components/SliderSection";
import { DataContext } from "../Context/DataContextProvider";
import useSite from "../Hook/useSite";
import { scrollToTop } from "../tools";
// const loading = {
//   SUCCESS: "success",
//   LOADING: "loading",
//   ERROR: "error",
// };

const SingleTVSeriesPage = () => {
  const { data } = useContext(DataContext);
  const { id } = useParams();
  const {appName}=useSite();

  // laoding states
  // const [bannerStatus, setBannerStatus] = useState(loading.LOADING);
  // data states
  const [thisTVSeries, setThisTVSeries] = useState({});
  const [relatedItems, setRelatedItems] = useState({
    byCategory: [],
    byGenre: [],
  });
  // check if already in stor
  const alReadyExistBanner = data?.tvs?.all?.find((item) => item?.TVID === id);
  useEffect(() => {
    if (alReadyExistBanner) {
      setThisTVSeries(alReadyExistBanner);
      // setBannerStatus(loading.SUCCESS);
    } else {
      MovieDom.getSingleItem({ id }).then((dt) => {
        if (dt) {
          setThisTVSeries(dt[0]);
          // setBannerStatus(loading.SUCCESS);
        } else {
          // setBannerStatus(loading.ERROR);
        }
      });
    }
  }, [alReadyExistBanner, id]);

  
  useEffect(
    () => (document.title = `${appName || ''}-${thisTVSeries?.TVtitle || ''}`),
    [thisTVSeries?.TVtitle,appName]
  );

  useLayoutEffect(() => {
    scrollToTop();
  }, [id]);

  useEffect(() => {
    MovieDom.getTVShows({
      category: thisTVSeries?.TVcategory,
      limit: 15,
    }).then((dt) => {
      if (dt) {
        setRelatedItems((state) => ({
          ...state,
          byCategory: dt.filter((item) => item.TVID !== thisTVSeries?.TVID),
        }));
      }
    });
  }, [id, data?.tvs, thisTVSeries, relatedItems?.byCategory?.length]);
  useEffect(() => {
    MovieDom.getTVShows({
      genre: thisTVSeries?.TVgenre,
      limit: 15,
    }).then((dt) => {
      if (dt) {
        setRelatedItems((state) => ({
          ...state,
          byGenre: dt.filter((item) => item?.TVID !== thisTVSeries?.TVID),
        }));
      }
    });
  }, [id, data?.tvs, thisTVSeries, relatedItems?.byGenre?.length]);
  if(!thisTVSeries) return <NotFound/>;
  return (
    <>
      <SingleTVSeries dataObj={thisTVSeries} />
      {relatedItems?.byCategory?.length !== 0 && (
        <VerticalSlider
          heading="Related TV Series"
          small={thisTVSeries.TVcategory}
          datas={relatedItems.byCategory}
        />
      )}
      {relatedItems?.byGenre?.length !== 0 && (
        <VerticalSlider
          heading="Related TV Series"
          small={thisTVSeries.TVgenre}
          datas={relatedItems.byGenre}
        />
      )}
    </>
  );
};

export default SingleTVSeriesPage;
