import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import theme from "../../../style/theme";
import Layout from "../../components/Layout/Layout";
import Cast from "./Cast";
import Details from "./Details";
import Player from "./Player";
import { useParams } from "react-router-dom";
import MovieDom from "../../../Api/MovieDom";
import { getServerImgPath, goToTop } from "../../../lib/tools";
import TMDBApi from "../../../Api/TMDB";
import { Container } from "react-bootstrap";
import RelatedItems from "../../components/Slider/RelatedItems";
import { useTitle } from "react-haiku";

const Watch = ({ movie }) => {
  const { id } = useParams();
  const [single_item, setSingleItem] = useState({});
  const [related_items, setRelatedItems] = useState([]);
  const [cast, setCast] = useState([]);
  useEffect(() => {
    MovieDom.getSingleItem({ id }).then((dt) => setSingleItem(dt[0]));
    // get Cast
    TMDBApi.getCasts(movie ? "movie" : "tv", id).then((res) => setCast(res));
  }, [id, movie]);

  useLayoutEffect(() => {
    goToTop();
  }, [id]);

  const watch_item_data = useMemo(() => single_item, [single_item]);

  useEffect(() => {
    if (single_item.MovieID || single_item.TVID) {
      // getRelated Items
      if (single_item.MovieID) {
        MovieDom.getMovies({
          category: single_item.MovieCategory || "",
          genre: single_item?.MovieGenre || "",
          limit: 15,
        }).then((dt) =>
          setRelatedItems(
            dt?.filter((item) => item.MovieID !== single_item.MovieID)
          )
        );
      } else {
        MovieDom.getTVShows({
          category: single_item.TVcategory || "",
          genre: single_item.TVgenre || "",
          limit: 15,
        }).then((dt) =>
          setRelatedItems(dt?.filter((item) => item.TVID !== single_item.TVID))
        );
      }
    }
  }, [single_item]);

  useTitle(
    `${MovieDom.appName}-${single_item.MovieTitle || single_item.TVtitle}`
  );

  return (
    <Layout
      style={{
        backgroundColor: `${theme.dark}bb`,
        backgroundImage: `url(${getServerImgPath(
          single_item.MovieID || single_item.TVID,
          single_item.backdrops_Poster || single_item.TVbackdrops,
          single_item.MovieID ? "movie" : "tv",
          "cover"
        )})`,
      }}
    >
      <Player data={watch_item_data} movie={movie} />
      <Details data={single_item} />
      <div className="mt-4">
        <Cast casts={cast} />
      </div>
      {related_items.length && (
        <Container className="mt-5">
          <RelatedItems
            title="You may like"
            route={single_item?.MovieID ? "/movies" : "/tv-series"}
            data={related_items}
            type={single_item.MovieID ? "movie" : "tv-series"}
            filter={{
              category:
                single_item.MovieCategory || single_item.TVcategory || "",
              genre: single_item.MovieGenre || single_item.TVgenre || "",
            }}
          />
        </Container>
      )}
    </Layout>
  );
};

export default Watch;
