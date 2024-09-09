import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import LoginRegistration from "../../../components/SVG/LoginRegistration";

const UserLoginRegiIndex = () => {
  return (
    <div id="page" className="center">
      <Container>
        <Row className="align-items-center justify-content-center flex-column-reverse flex-md-row g-0">
          <Col xs={12} md={8}>
            <LoginRegistration />
          </Col>
          <Col xs={12} md={4}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserLoginRegiIndex;
