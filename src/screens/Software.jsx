import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import MovieDom from "../api/MovieDom";
import { ServerImage } from "../components/SmallComponents";
import { _HIT_ORIGIN } from "../tools";

function getSoftwareImage(dataObj) {
  return dataObj.cover ? `${dataObj.cover}` : `${_HIT_ORIGIN}/no-poster.jpg`;
}

const Software = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MovieDom.getSoftware()
      .then((dt) => {
        setData(dt);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="light" />
      </div>
    );
  }
  if (!loading && !data.length) {
    return (
      <>
        <img
          src={`${_HIT_ORIGIN}/software-banner.jpg`}
          alt=""
          className="w-100"
        />
        <div className="center" style={{ height: "100vh" }}>
          <img
            src={`${_HIT_ORIGIN}/failed.png`}
            style={{ maxWidth: 300 }}
            className="w-100"
            alt=""
          />
        </div>
      </>
    );
  }

  return (
    <div style={{margin:`4rem 0rem`,minHeight:'100vh'}}>
      <img
        src={`${_HIT_ORIGIN}/software-banner.jpg`}
        alt=""
        className="w-100"
      />
      <div style={{margin:`1rem 0rem`}}>
        <Container>
          <Row xs={2} md={4} lg={5} className="g-2">
            {data?.map((item) => (
              <Col>
                <Card className="bg-dark rounded-2 overflow-hidden">
                  <ServerImage
                    src={getSoftwareImage(item)}
                    type="screen"
                    broken_img="software_banner.jpg"
                    className="w-100"
                  />
                  <Card.Body style={{padding:'0.5rem'}}>
                    <h6 className="text-light mb-1">{item.title}</h6>
                    <small className="d-inline-flex ms-2 px-1 rounded-2 text-dark bg-light fw-bold">
                      {item.filesize}
                    </small>
                    <a
                      className=" btn  w-100 text-center justify-content-center my-2 mt-3 gap-2"
                      href={item.downLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download <i class="fas fa-arrow-alt-circle-down"></i>
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Software;
