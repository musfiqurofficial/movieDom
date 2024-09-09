import React, { useEffect, useLayoutEffect } from "react";
import HomeBanner from "../components/HomeComponents/HomeBanner";
import FeaturedSection from "../components/HomeComponents/FeaturedSection";
import {
  HoverVideoSlider,
  LandScapeSlider,
  MovileBannerSlider,
  VerticalSlider,
  ContinueWatchingSlider,
} from "../components/SliderSection";
import { DataContext } from "../Context/DataContextProvider";
import { useContext } from "react";
import { LoadingBanner } from "../components/LoadingSkeleton/Loading";
import { WindowContext } from "../Context/WindowContextProvider";
import { basic_slider } from "../api/MovieDom";
import useSettings from "../Hook/useSettings";
import GenreSlider from "../components/GenreSlider";
import { scrollToTop } from "../tools";
import BasicSlider from "../components/Slider/BasicSlider";
import useSite from "../Hook/useSite";

export default function Home() {
  const { data } = useContext(DataContext);
  const settings = useSettings();
  const { appName } = useSite();
  const { notDesktop } = useContext(WindowContext);
  useLayoutEffect(() => {
    scrollToTop();
  }, []);
  useEffect(() => {
    if (document.title) {
      document.title = `${appName || ""}-${settings?.site_title || ""}`;
    }
  }, [settings, appName]);

  return (
    <>
      {data?.movies?.recent?.length !== 0 ? (
        notDesktop ? (
          <MovileBannerSlider datas={data?.movies?.recent} type="movie" />
        ) : basic_slider ? (
          <BasicSlider data={data?.movies?.recent} />
        ) : (
          <HomeBanner data={data?.movies?.recent} />
        )
      ) : (
        <LoadingBanner />
      )}
      <div className="py-3 py-md-0">
        <GenreSlider />
      </div>
      <ContinueWatchingSlider />
      <HoverVideoSlider
        className="tv-show-area slider-section"
        heading="Recent TV Series"
        datas={data?.tvs?.recent}
      />
      <div id="sakib">
        <LandScapeSlider
          className="tranding-area slider-section"
          heading="Recent Released Movies"
          datas={data?.movies?.recent}
        />
      </div>
      <FeaturedSection dataObj={data?.tvs?.recent[0]}></FeaturedSection>
      <VerticalSlider
        className="recently-area slider-section"
        heading="Hollywood Movies"
        datas={data?.movies?.hollywood}
        route="/movies?category=Hollywood"
      />
      <LandScapeSlider
        className="tranding-area slider-section"
        heading="Bollywood Movies"
        datas={data?.movies?.bollywood}
        route="/movies?category=Bollywood"
      />
      <VerticalSlider
        className="recently-area slider-section"
        heading="Tamil Movies"
        datas={data?.movies?.Tamil}
        route="/movies?category=Tamil"
      />

      <VerticalSlider
        className="recently-area slider-section"
        heading="Tamil Hindi Dubbed"
        datas={data?.movies?.Tamil_Hindi_Dubbed}
        route="/movies?category=Tamil Hindi Dubbed"
      />
      <VerticalSlider
        className="recently-area slider-section"
        heading="Animation Movies"
        datas={data?.movies?.animation}
        route="/movies?category=Animation"
      />

      <VerticalSlider
        className="recently-area slider-section"
        heading="IMDB Top"
        datas={data?.movies?.IMDB_20Top}
        route="/movies?category=IMDB Top"
      />

      <LandScapeSlider
        className="tranding-area slider-section"
        heading="Korean Movies"
        datas={data?.movies?.korean}
        route="/movies?category=Korean"
      />

      <VerticalSlider
        className="recently-area slider-section"
        heading="3D Movies"
        datas={data?.movies?._3D_Movie}
        route="/movies?category=3D"
      />
    </>
  );
}
