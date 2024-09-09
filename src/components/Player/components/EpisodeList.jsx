import { useContext } from "react";
import {
  Accordion,
  AccordionContext,
  Card,
  Col,
  Row,
  useAccordionButton,
} from "react-bootstrap";
import { MainServerURL } from "../../../api/MovieDom";
import { getS0E0 } from "../../../tools";
import { DataContext } from "../Context/DataContext";
import { PlayerContext } from "../Context/PlayerContextProvider";

const accordionHeader = {
  padding: 0,
};

function CustomToggle({ classList = {}, children, eventKey }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey);

  const isCurrentEventKey = activeEventKey === eventKey;
  return (
    <button
      type="button"
      className={`card-header w-100 text-start ${classList.card_header} ${
        isCurrentEventKey ? classList.active : ""
      }`}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function EpisodeCard({ classList = {}, episode = {} }) {
  return (
    <Row>
      <Col className="col-5">
        <img
          src={`${MainServerURL}/Admin/main/TVseries/${episode.TVID}/${getS0E0(episode.season_number)}/${getS0E0(episode.episode_number)}/${episode.still_path}`}
          alt=""
          className="img-fluid"
        />
      </Col>
      <Col className="col-7">
        <div>
          <b>
            S{episode.season_number}E{episode.episode_number}.
          </b>{" "}
          <h5>{episode.name}</h5>
        </div>
        <p className="text-in-2">{episode.overview}</p>
      </Col>
    </Row>
  );
}

export default function EpisodeList({ classList = {}, season = "",handleShowList }) {
  const { playerData, updateAcitveItem } = useContext(DataContext);
  const { updateHideBar} = useContext(PlayerContext);
  const thisEpisodeList = playerData?.tvEpisodes?.filter(
    (item) => item?.season_number === season
  );

  return (
    <Accordion
      defaultActiveKey={
        season === playerData.activeItem.s ? playerData.activeItem.e : "1"
      }
    >
      {thisEpisodeList.map((item) => (
        <Card className={classList.episode_card} key={item.EPIID}>
          <Card.Header
            style={accordionHeader}
            className={classList.card_header}
          >
            <CustomToggle eventKey={item.episode_number} classList={classList}>
              {item.episode_number}. {item.name}
            </CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey={item.episode_number}>
            <Card.Body
              className={classList.card_body}
              onClick={() => {
                updateAcitveItem(item);
                handleShowList(false);
                updateHideBar(false)
              }}
            >
              <EpisodeCard episode={item} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
}
