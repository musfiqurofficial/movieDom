import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { WindowContext } from "../Context/WindowContextProvider.jsx";
import useSite from "../Hook/useSite.js";
import MovieDom from "../api/MovieDom.js";
import { MobileCard } from "../components/Cards.jsx";
import { scrollToTop } from "../tools.js";
const softs = [
  {
    game:true,
    id: "1",
    GamesID: "86153",
    GamesCate: "Pc Games",
    GamesTitle: "Need for Speed Unbound",
    screenposter: "3413569-4493805105-libra.jpg",
    thumbposter: "3413569-4493805105-libra.jpg",
    GamesPlatform: "PC,PlayStation 5,Xbox Series X|S",
    GamesReleaseDate: "2022-11-29 00:00:00",
    GamesGenre: "Driving/Racing",
    Developers: "Criterion Games,Criterion Cheshire",
    publishers: "Electronic Arts",
    GamesFileSize: "122",
    DownloadLink:
      "http://content2.binodonmela.net/Movie/Game/PC%20Games/8%20Bit%20Farm%20GoldBerg%20PC%20Game/",
    ShortDetails:
      "After a three year hiatus, Need for Speed returns with an all-new art style.",
    GamesStory: "",
    uploadedUser: "jamirul",
    UpTime: "2023-04-03 12:56:56",
    Gviews: "0",
    Published: "0",
  },
  {
    software:true,
    id: "20",
    Date: "2023-06-25 11:37:47",
    title: "Adobe Premiere Pro CC 2015",
    cover: "Admin/main/Software/b15601bbca.png",
    downLink:
      "http://content2.binodonmela.net/Movie/Software/Adobe%20Premiere%20Pro%20CC%202015.3%20v10.3.0%20x64/Adobe%20Premiere%20Pro%20CC%202015.3%20v10.3.0%20x64.rar",
    shorDetails: "",
    cata: "54",
    filesize: "",
    upby: "jamirul",
    publish: "0",
    views: "0",
    picU: "1",
  }
];

const status = {
  INITIAL: "initial",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState(status.INITIAL);
  const [searchedItems, setSearchedItems] = useState([]);
  const searchParam = searchParams.get("search");
  const { notDesktop } = useContext(WindowContext);
  const { appName } = useSite();

  useEffect(() => {
    document.title = `${appName || ""}-Search:${searchParam || ""}`;
    setState(status.LOADING);
    MovieDom.searchItems({ search: searchParam }).then((dt) => {
      if (dt.length) {
        setSearchedItems(dt);
        setState(status.SUCCESS);
      } else {
        setState(status.ERROR);
      }
    });
  }, [searchParam, appName]);
  useLayoutEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <div id="search-page">
        {state === status.SUCCESS ? (
          <div className="theme-container">
            {/* {!notDesktop && <div className="sidebar">
              {searchedItems?.slice(0, 10)?.map((item) => (
                <p className="title" key={item.id}>{item.MovieTitle || item.TVtitle}</p>
              ))}
            </div>} */}
            <PosterLayoutView searchResult={searchedItems} />
          </div>
        ) : state === status.ERROR ? (
          <div className="min-80vh center">
            <h2 className="text-white">OPS !</h2>
            <h4 className="text-white">
              Sorry, this time , we have nothing for you
            </h4>
          </div>
        ) : state === status.LOADING ? (
          <div className="min-80vh center">
            <h2 className="text-white">Loading</h2>
            <h4 className="text-white">
              We are looking for your searched data.
            </h4>
          </div>
        ) : (
          <div className="min-80vh center">
            <h2 className="text-white">Search</h2>
            <h4 className="text-white">Movies TV Series</h4>
          </div>
        )}
      </div>
    </>
  );
};

function PosterLayoutView({ searchResult }) {
  return (
    <Row xs={3} sm={3} md={5} lg={6} className="g-1 g-md-2 result-cards">
      {searchResult.length !== 0 &&
        [...searchResult].map((result) => (
          <Col key={result.id}>
            <MobileCard dataObj={result} />
          </Col>
        ))}
    </Row>
  );
}

export default Search;
