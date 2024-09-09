import axios from "axios";
import "core-js/full";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataContextProvider from "./Context/DataContextProvider";
import LSContextProvider from "./Context/LSContextProvider";
import WindowContextProvider from "./Context/WindowContextProvider";
import useData from "./Hook/useData";
import useSettings from "./Hook/useSettings";
import useSite from "./Hook/useSite";
import useDevice from "./Screen_v5.5/hooks/useDevice";
import {
  updateBannerData,
  updateHomeData,
  update_recent_movies,
  update_recent_tv_shows,
} from "./Screen_v5.5/redux/slices/home_slice";
import {
  updateMovieMenu,
  updateTvMenu,
} from "./Screen_v5.5/redux/slices/menu_slice";
import Home from "./Screen_v5.5/views/pages/private/Home/Home";
import MovieDom, {
  MainServerURL,
  domain,
  redirect_to_domain,
} from "./api/MovieDom";
import AppPopup from "./components/AppPopup";
import AllLiveTV from "./components/LiveTV/AllLiveTV";
import SingleLiveTV from "./components/LiveTV/SingleLiveTV";
import { LoadingBanner } from "./components/LoadingSkeleton/Loading";
import NotFound from "./components/NotFound";
import MovieDomPlayer from "./components/Player/MovieDomPlayer";
import WatchingPopup from "./components/WatchingPopup";
import PageLayOut from "./components/pageLayout/PageLayOut";
import ActorProfile from "./screens/ActorProfile";
import Games from "./screens/Games";
import LiveTV from "./screens/LiveTV";
import MyList from "./screens/MyList";
import NotMember from "./screens/NotMember";
import Renew from "./screens/Renew";
import Request from "./screens/Request";
import Search from "./screens/Search";
import SingleMoviePage from "./screens/SingleMoviePage";
import SingleTVSeriesPage from "./screens/SingleTVSeriesPage";
import Software from "./screens/Software";
import Movies from "./simple_theme/view/pages/Movies/Movies";
import TVSeries from "./simple_theme/view/pages/TVSeries/TVSeries";
import { _HIT_ORIGIN } from "./tools";

const expire_date_secrate_value = {
  date: 20,
  month: 51,
  year: 111111,
};

class MenuTamplate {
  constructor(menu = {}) {
    this.id = menu.id;
    this.name = menu.menu_name;
  }
}

function App() {
  const [loading, setLoading] = useState(true);
  const [not_expired, setNotExpired] = useState(false);
  const { appName, blocked } = useSite();
  const settings = useSettings();
  const dispatch = useDispatch();
  const { updateTVShows, updatemovies, updateLiveTV } = useData();

  //
  useDevice();
  useEffect(() => {
    console.log(
      `%c${appName}`,
      "color: white;font-size:30px;font-weight:700;letter-spacing:1.5px;background:red;padding:15px;border-radius:4px;"
    );
    console.log(
      `%c${MainServerURL}`,
      "color: white;font-size:30px;font-weight:700;letter-spacing:1.5px;background:red;padding:15px;border-radius:4px;"
    );

    try {
      axios(`${_HIT_ORIGIN}/manifest.json?timestamp=${new Date().getTime()}`, {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
        .then((res) => {
          if (res?.data?.am !== false) {
            if (
              res?.data?.swdetreactduwred &&
              res?.data?.swdetreactmuwred &&
              res?.data?.swdetreactyuwred
            ) {
              const last_date = new Date(
                res?.data?.swdetreactyuwred - expire_date_secrate_value.year,
                res?.data?.swdetreactmuwred - expire_date_secrate_value.month,
                res?.data?.swdetreactduwred - expire_date_secrate_value.date
              );
              const this_date = new Date();
              last_date > this_date
                ? setNotExpired(true)
                : setNotExpired(false);
            } else {
              setNotExpired(false);
            }
          } else {
            setNotExpired(true);
          }
        })
        .catch((err) => {
          setNotExpired(false);
        })
        .finally(() => setLoading(false));
    } catch (er) {
      setNotExpired(false);
      setLoading(false);
    }
  }, [appName]);

  useEffect(() => {
    if (document?.title) {
      document.title = `${appName || ""} - ${settings?.site_title || ""}`;
    }
  }, [settings?.site_title, appName]);

  useEffect(() => {
    if (window.location.href.includes(MainServerURL) && redirect_to_domain) {
      window.location.href = window.location.href.replace(
        MainServerURL,
        domain
      );
    }
    MovieDom.getMovies({ limit: 10 }).then((dt) => {
      dispatch(updateBannerData(dt));
      dispatch(update_recent_movies(dt));
    });
    MovieDom.getTVShows({ limit: 15 }).then((dt) => {
      dispatch(
        update_recent_tv_shows({
          id: 0,
          name: "Recent TV Series",
          data: dt?.length ? dt : [],
        })
      );
    });

    MovieDom.getCategories("movie").then((dt) => {
      dt?.forEach((ele, i) => {
        MovieDom.getMovies({
          category: ele?.name,
          limit: 15,
        }).then((data) => {
          data?.length > 1 &&
            +ele.id !== 7 &&
            dispatch(
              updateHomeData({
                id: +ele?.id || i,
                name: ele?.name,
                data: data?.length ? data : [],
              })
            );
        });
      });
    });
    MovieDom.getSortedItems(
      {
        category: "Indian Bangla",
        limit: 15,
      },
      "movie"
    ).then((data) => {
      data?.length > 1 &&
        dispatch(
          updateHomeData({
            id: 6,
            name: "Indian Bangla",
            data: data?.length ? data : [],
          })
        );
    });

    MovieDom.getMenu().then((dt) => {
      const movie_cats = dt
        .filter((ele) => ele.parent === "movies")
        .map((ele) => new MenuTamplate(ele));
      const tv_cats = dt
        .filter((ele) => ele.parent === "Tv Series")
        .map((ele) => new MenuTamplate(ele));
      // const quality=dt.filter(ele=>ele.parent==='quality').map(ele=>new MenuTamplate(ele));
      dispatch(updateMovieMenu({ category: movie_cats }));
      dispatch(updateTvMenu({ category: tv_cats }));
    });

    MovieDom.getGenres("movie").then((genre) => {
      dispatch(updateMovieMenu({ genre: genre }));
    });
    MovieDom.getGenres("tv").then((genre) => {
      dispatch(updateTvMenu({ genre: genre }));
    });
    MovieDom.getYears("movie").then((years) => {
      dispatch(updateMovieMenu({ year: years }));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    MovieDom.updateTotalHit().catch((e) => console.log(e.message));
    MovieDom.getMovies({
      sort_by: "uploadTime DESC",
      limit: 10,
    }).then((dt) => updatemovies("recent", dt));
    MovieDom.getTVShows({
      limit: 10,
      sort_by: "uploadTime DESC",
    }).then((dt) => updateTVShows("recent", dt));
    /* ------------ -------------- */
    MovieDom.getMovies({
      sort_by: "uploadTime DESC",
      limit: 10,
      category: "Hollywood",
    }).then((dt) => updatemovies("hollywood", dt));
    MovieDom.getMovies({
      sort_by: "uploadTime DESC",
      limit: 10,
      category: "Bollywood",
    }).then((dt) => updatemovies("bollywood", dt));
    MovieDom.getMovies({
      sort_by: "uploadTime DESC",
      limit: 10,
      category: "3D",
    }).then((dt) => updatemovies("_3D_Movie", dt));
    MovieDom.getMovies({
      sort_by: "uploadTime DESC",
      limit: 10,
      category: "Tamil Hindi Dubbed",
    }).then((dt) => updatemovies("Tamil_Hindi_Dubbed", dt));
    MovieDom.getMovies({
      sort_by: "uploadTime DESC",
      limit: 10,
      category: "IMDB Top",
    }).then((dt) => updatemovies("IMDB_20Top", dt));
    MovieDom.getMovies({
      sort_by: "uploadTime DESC",
      limit: 10,
      category: "Animation",
    }).then((dt) => updatemovies("animation", dt));
    MovieDom.getMovies({
      sort_by: "uploadTime DESC",
      limit: 10,
      category: "Korean",
    }).then((dt) => updatemovies("korean", dt));
    MovieDom.getMovies({
      sort_by: "uploadTime DESC",
      limit: 10,
      category: "Tamil",
    }).then((dt) => updatemovies("Tamil", dt));
    MovieDom.getLiveTV().then((dt) => updateLiveTV({ dt }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (blocked) {
    return <NotMember />;
  }

  return loading ? (
    <LoadingBanner />
  ) : not_expired ? (
    <>
      <LSContextProvider>
        <WindowContextProvider>
          <DataContextProvider>
            <PageLayOut>
              <WatchingPopup />
              <AppPopup />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="movies" index element={<Movies />} />
                <Route path="movies/:id" element={<SingleMoviePage />} />
                <Route path="tv-series" element={<TVSeries />} />
                <Route path="tv-series/:id" element={<SingleTVSeriesPage />} />
                <Route path="tv-series/:id" element={<SingleTVSeriesPage />} />
                <Route path="live-tv" element={<LiveTV />} />
                <Route path="live-tv/all" element={<AllLiveTV />} />
                <Route
                  path="live-tv/:live_tv_name"
                  element={<SingleLiveTV />}
                />
                <Route path="actor" element={<ActorProfile />} />
                <Route path="my-list" element={<MyList />} />
                <Route path="player" element={<MovieDomPlayer />} />
                <Route path="request" element={<Request />} />
                <Route path="games" element={<Games />} />
                <Route path="software" element={<Software />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
              <ToastContainer theme="dark" />
            </PageLayOut>
          </DataContextProvider>
        </WindowContextProvider>
      </LSContextProvider>
    </>
  ) : (
    <Renew />
  );
}

export default App;
