import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getServerImgPath } from "../../../lib/tools";
import { Button } from "../../../style/common/Button";
import { A, Tag, Tags } from "../../../style/common/Tag";
import { H3, P } from "../../../style/typography/typography";
import Image from "../../components/common/Image";

const Details = ({ data }) => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={3}>
          <Image
            poster
            src={getServerImgPath(
              data.MovieID || data.TVID,
              data.poster || data.TVposter,
              data.MovieID ? "movie" : "tv",
              "poster"
            )}
            alt=""
            className="poster w-100"
          />
        </Col>
        <Col>
          <H3>
            {data?.MovieTitle || data?.TVtitle} (
            {data?.MovieYear || data?.TVrelease})
          </H3>
          <div className="d-flex align-items-center justify-content-start gap-3 mb-3">
            <div>
              <H3 color="primary" className="mb-0">
                <i className="fa-solid fa-star"></i> {data.MovieRatings}
              </H3>
            </div>
            <Button className="py-2 px-3" title="Favourite">
              <i className="fa-solid fa-heart"></i>
            </Button>
            <Button className="py-2 px-3" title="Wish list">
              <i className="fa-solid fa-clock"></i>
            </Button>
          </div>
          <div className="d-flex align-items-center justify-content-start gap-3 mb-2">
            <P className="mb-0">{data.MovieRuntime} Min</P>
            <A as={NavLink}
              to={`${data.MovieID ? "/movies" : "/tv-series"}?category=${
                data.MovieCategory || data.TVcategory
              }`}
            >
              {data.MovieCategory || data.TVcategory}
            </A>
            <Tags className="mb-0">
              {data?.MovieGenre?.trim()
                ?.split(",")
                .map((item) => (
                  <Tag>
                    <A>{item}</A>,
                  </Tag>
                ))}
            </Tags>
            <P className="mb-0">{data.MovieQuality}</P>
          </div>
          <P>{data.MovieStory || data.TVstory}</P>
          {/* <Row xs={1} md={2} lg={4} className="mt-4">
            <Col>
              <H6>Sakib Siddiqi</H6>
              <P>Director</P>
            </Col>
            <Col>
              <H6>Sakib Siddiqi</H6>
              <P>Director</P>
            </Col>
            <Col>
              <H6>Sakib Siddiqi</H6>
              <P>Director</P>
            </Col>
          </Row> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
