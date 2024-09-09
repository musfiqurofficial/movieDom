import React, { useEffect,useLayoutEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import MovieDom from "../api/MovieDom";
import TMDBApi from "../api/TMDB";
import SingleMovieBanner from "../components/SinglePageComponents/SingleMovieBanner";
import { VerticalSlider } from "../components/SliderSection";
import { DataContext } from "../Context/DataContextProvider";
import useSite from "../Hook/useSite";
import CoverSlider from "../Screen_v5.5/views/components/sliders/Cover.Slider";
import { scrollToTop, titleRoute } from "../tools";

const loading = {
  SUCCESS: "success",
  LOADING: "loading",
  ERROR: "error",
};

const SingleMoviePage = () => {
  const { data } = useContext(DataContext);
  const { id } = useParams();
  const [thisMovie, setThisMovie] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(loading.LOADING);
  const [casts, setCasts] = useState([]);
  const [matchedByCategory, setMatchedByCategory] = useState([]);
  const [matchedByGenre, setMatchedByGenre] = useState([]);
  const {appName}=useSite();


  useLayoutEffect(() => {
    scrollToTop();
  }, [id]);


  // Set this movie.
  useEffect(() => {
    setLoadingStatus(loading.LOADING);
    const isOnStor = data?.movies?.all?.find(
      (item) => titleRoute(item.MovieID) === id
    );
    if (isOnStor) {
      setThisMovie(isOnStor);
      setLoadingStatus(loading.SUCCESS);
      TMDBApi.getCasts("movie", thisMovie.MovieID).then((dt) => setCasts(dt));
    } else {
      MovieDom.getSingleItem({ id: id }).then((dt) => {
        if (dt?.length) {
          setThisMovie(dt[0]);
          setLoadingStatus(loading.SUCCESS);
          TMDBApi.getCasts("movie", dt[0].MovieID).then((dt) => {
            setCasts(dt);
          });
        } else {
          setThisMovie([]);
          setLoadingStatus(loading.ERROR);
        }
      });
    }
    document.title = `${appName || ''}-${thisMovie?.MovieTitle || ''}`;
  }, [data?.movies?.all, thisMovie?.MovieID, thisMovie?.MovieTitle, id,appName]);

  // __Related Movies__
  useEffect(() => {
    MovieDom.getMovies({
      sort_by: "MovieYear DESC",
      category: thisMovie?.MovieCategory,
      limit: 10,
    }).then((dt) => {
      setMatchedByCategory(
        dt.filter((item) => item.MovieID !== thisMovie?.MovieID)
      );
    });
    MovieDom.getMovies({
      sort_by: "MovieYear DESC",
      genre: thisMovie?.MovieGenre,
      limit: 10,
    }).then((dt) => {
      setMatchedByGenre(
        dt.filter((item) => item.MovieID !== thisMovie.MovieID)
      );
    });
  }, [thisMovie]);


  return (
    <>
      <SingleMovieBanner
        loadingStatus={loadingStatus}
        casts={casts}
        thisMovie={thisMovie}
      />
      {thisMovie.MovieCategory && (
        <VerticalSlider
          heading={`Realated Movies`}
          small={thisMovie?.MovieCategory}
          datas={matchedByCategory}
        />
      )}
      {thisMovie.MovieGenre && (
        <VerticalSlider
          heading="Realted Movies"
          small={thisMovie.MovieGenre}
          datas={matchedByGenre}
        />
      )}
    </>
  );
};

export default SingleMoviePage;
