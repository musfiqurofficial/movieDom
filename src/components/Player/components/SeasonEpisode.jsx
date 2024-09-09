import React, { useContext } from "react";
import { useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { ArrowLeft } from "../assets/Icon/Icons";
import { DataContext } from "../Context/DataContext";
import PlayerButtons from "../PlayerButtons";
import EpisodeList from "./EpisodeList";

const SeasonEpisode = ({ classList = {},handleShowList }) => {
  const { playerData } = useContext(DataContext);
  const [activeTab, setActiveTab] = useState(playerData.activeItem.s);
  const [episodeView, setEpisodeView] = useState(true);

  // Total Seasons
  const totalSeason = parseInt(
    playerData.tvEpisodes[playerData?.tvEpisodes?.length - 1].season_number
  );


  return (
    <Tab.Container
      id="left-tabs-example"
      activeKey={activeTab}
      onSelect={(k) => {
        setActiveTab(k);
        setEpisodeView(true);
      }}
    >
      <Row className={`row-cols-1 flex-nowrap playlist ${classList.season_episode_pop_up}`}>
        <Col
          style={{
            display: episodeView ? "none" : "block",
          }}
          className={classList.S0E0}
        >
          <Nav variant="pills" className="flex-column">
            <h3 className={`${classList.title} p-2`}>{playerData?.tvShow?.TVtitle || 'TV Show'}</h3>

            {[...Array(totalSeason)].map((season, index) => (
              <Nav.Item key={index}>
                <Nav.Link className={classList.season_tab} eventKey={index + 1}>
                  Season {index + 1}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>

        <Col
          style={{
            opacity: episodeView ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
          className={classList.S0E0}
        >
          <Tab.Content>
            {[...Array(totalSeason)].map((season, index) => (
              <Tab.Pane eventKey={index + 1} key={index}>
                <div className={classList.header}>
                  <PlayerButtons
                    type="button"
                    classList={classList}
                    onClick={() => setEpisodeView(false)}
                  >
                    <ArrowLeft />
                  </PlayerButtons>
                  <h3 className={`${classList.title} p-2`}>
                    Season {index + 1}
                  </h3>
                </div>
                <EpisodeList
                handleShowList={handleShowList}
                  classList={classList}
                  season={(index + 1).toString()}
                />
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default SeasonEpisode;
