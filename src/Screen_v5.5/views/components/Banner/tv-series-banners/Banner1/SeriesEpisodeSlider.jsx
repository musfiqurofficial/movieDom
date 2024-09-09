import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { DUMMY_TV_EPISODES } from "../../../../../data/DUMMY_TV_EPISODES";
import MDomExpextSlider from "../../../sliders/MDomSliders/MDomExpextSlider";

const SeriesEpisodeSlider = () => {
  return (
    <div className="tv-episodes">
      <Tabs defaultActiveKey="season_1" className="season_tabs container">
        <Tab eventKey="season_1" title="Season 1">
          <MDomExpextSlider data={DUMMY_TV_EPISODES} tv_slider />
        </Tab>
        <Tab eventKey="season_2" title="Season 2">
          <MDomExpextSlider data={DUMMY_TV_EPISODES.slice(1)} tv_slider />
        </Tab>
        <Tab eventKey="season_3" title="Season 3">
          <MDomExpextSlider data={DUMMY_TV_EPISODES.slice(2)} tv_slider />
        </Tab>
      </Tabs>
    </div>
  );
};

export default SeriesEpisodeSlider;
