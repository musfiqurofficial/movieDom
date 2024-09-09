import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { scrollToTop, _HIT_ORIGIN } from "../../../../../tools";
import { homeSelector } from "../../../../redux/slices/home_slice";
import HomeBanner1 from "../../../components/Banner/home-banner/Banner1/HomeBanner1";
import CoverSlider from "../../../components/sliders/Cover.Slider";
import ExpendSlider from "../../../components/sliders/Expend.Slider";
import OverlaySlider from "../../../components/sliders/Overlay.Slider";

const Home = () => {
  const { home_data, recent_tv } = useSelector(homeSelector);
  const [home_json, setHomeJeson] = useState({});

  function renderSlider(data, indx) {
    const useCoverCard = (home_json.cover_card || [])?.indexOf(data?.id) >= 0;
    const hide=(home_json.hide || [])?.indexOf(data?.id) >= 0;
    const dontUseCoverCard = !useCoverCard;
    const send_props = {
      title: `${data.name} Movies`,
      more: `/movies?category=${data.name}`,
      data: data.data,
    };
    if(hide) return null;
    if (dontUseCoverCard)
      return (
        <ExpendSlider
          tv_slider={indx === 0}
          more={indx === 0 ? `/tv-series` : `/movies?category=${data.name}`}
          title={`${data.name}`}
          data={data.data}
        />
      );
    else if (useCoverCard) {
      if (indx % 2 === 0) return <CoverSlider {...send_props} />;
      else return <OverlaySlider {...send_props} />;
    }
  }

  useLayoutEffect(() => {
    axios(`${_HIT_ORIGIN}/home.json?${new Date().getTime()}`)
      .then(({ data }) => {
        setHomeJeson(data);
      })
      .catch((error) => {
        console.warn(error);
      });
    scrollToTop();
  }, []);

  return (
    <div className="pb-50">
      <HomeBanner1 />
      {!!recent_tv?.data?.length ? (
        <ExpendSlider
          tv_slider={true}
          more={`/tv-series`}
          title={`${recent_tv?.name}`}
          data={recent_tv?.data}
        />
      ) : null}
      {/* <OverlaySlider
        {...{
          title: `Recent Movies`,
          more: `/movies`,
          data: recent_movies.data,
        }}
      /> */}
      {home_data?.length &&
        home_data?.slice(0)?.map((ele, indx) => renderSlider(ele, indx))}
    </div>
  );
};

export default Home;
