import React, { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { MainServerURL } from "../../../api/MovieDom";
import { getS0E0 } from "../../../tools";
import { DataContext } from "../Context/DataContext";

const NextEpisode = ({ classList = {} }) => {
  const { playerData, updateNextItem } = useContext(DataContext);

  return (
    <Card
      className={classList.nextEpisode}
      onClick={() => {
        updateNextItem();
      }}
    >
      <Card.Header className={classList.card_header}>
        <h3>Next Episode</h3>
      </Card.Header>
      <Card.Body className={classList.card_body}>
        <Row>
          <Col>
            <img
              src={`${MainServerURL}/Admin/main/TVseries/${
                playerData?.tvShow?.TVID
              }/${getS0E0(playerData?.nextItem?.s)}/${getS0E0(
                playerData?.nextItem?.e
              )}/${playerData?.nextItem?.backdrop}`}
              alt=""
              className="img-fluid"
            />
          </Col>
          <Col>
            <div>
              <b>
                S{playerData?.nextItem?.s}E{playerData?.nextItem?.e}.
              </b>{" "}
              <h5>{playerData?.nextItem?.title}</h5>
            </div>
            <p className="text-in-2">{playerData?.nextItem?.story}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default NextEpisode;
