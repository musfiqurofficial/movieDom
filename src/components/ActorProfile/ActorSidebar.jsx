import React from "react";
import { Col, Row } from "react-bootstrap";

const ActorSidebar = ({ cast }) => {
  return (
    <Row className='g-2 g-md-4 justify-content-center justify-content-md-start'>
      <Col xs={8} md={2} className='text-center'>
        <img
          src={`https://www.themoviedb.org/t/p/w300/${cast?.profile_path}`}
          alt=""
          className="actor-picture img-fluid"
        />
      </Col>
      <Col xs={12} md={10}>
        <div className="content-wrapper">
          <div className="actor-data text-center text-md-start">
            <div className="actor-overview">
              <h2 className="actor-name">{cast.name}</h2>
              <ul className="mb-3 d-flex justify-content-center justify-content-md-start" style={{gap:'5px'}}>
                <li className="text-dark bg-light p-2 rounded-3"><i>{cast.known_for_department}</i></li>
                <li className="text-dark bg-light p-2 rounded-3"><i>{cast.birthday}</i></li>
                <li className="text-dark bg-light p-2 rounded-3"><i>{cast.place_of_birth}</i></li>
              </ul>
              {/* <p>
                Gender : <b>Female</b>
              </p>
              <p>
                Birthday : <b>{cast.birthday}</b>
              </p>
              <p>
                Known as : <b>{cast.known_for_department}</b>
              </p> */}
              <p className="actor-about">
                {cast.biography}
              </p>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ActorSidebar;
