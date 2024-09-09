import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { WindowContext } from "../Context/WindowContextProvider";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { options, MainServerURL } from "../api/MovieDom";
import { _HIT_ORIGIN } from "../tools";

const AppPopup = () => {
  const { pathname } = useLocation();
  const [appData, setAppData] = useState(null);
  const [disablePopup, setDisablePopup] = useState(false);
  const [show, setShow] = useState(false);
  const { watching_popup } = useContext(WindowContext);
  const popup = useRef(null);
  useEffect(() => {
    axios(`${_HIT_ORIGIN}/mobile-app.data.json?timestamp=${new Date().getTime()}`)
      .then((res) => {
        setAppData(res.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  return disablePopup ? (
    <></>
  ) : (
    <>
      {!pathname.includes("/player") && appData && (
        <>
          <div
            className="app-popup"
            style={{
              display: watching_popup.show ? "none" : "initial",
              position: "relative",
            }}
          >
            <div
              className="floating-items"
              style={{ "--bottom": "15%", "--sm-bottom": "40%" }}
              onClick={() => setShow(true)}
            >
              <span
                className="center cross"
                onClick={() => setDisablePopup(true)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  borderRadius: 1000,
                  height: "60%",
                  width: "60%",
                  background: "white",
                  transform: "translate(50%,-50%)",
                  boxShadow: "-3px 3px 5px 0 #00000030",
                }}
              >
                <i className="fas fa-times" style={{ color: "black" }}></i>
              </span>
              <img
                src={`${_HIT_ORIGIN}/${appData?.logo}`}
                alt={appData?.appName}
                style={{ width: "100%",borderRadius:1000 }}
              />
            </div>
          </div>
          <div
            ref={popup}
            style={{
              display: show ? "" : "none",
            }}
            className="watching-popup app-popup"
            onClick={function (e) {
              e.target.className === popup.current.className && setShow(false);
            }}
          >
            <div className="popup-container popup-body p-2 p-md-4">
              <button className="close-btn" onClick={() => setShow(false)}>
                <i className="fas fa-times"></i>
              </button>
              <Row>
                <Col xs={12} md={5} className="center">
                  <img
                    src={`${_HIT_ORIGIN}/${appData?.image}`}
                    alt={appData?.appName}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col xs={12} md={7}>
                  <div className="app-logo">
                    <img
                      src={`${_HIT_ORIGIN}/${appData?.logo}`}
                      alt={appData?.appName}
                      style={{
                        borderRadius:1000
                      }}
                    />
                  </div>
                  <h3 className="title">{appData?.appName} Mobile App</h3>
                  <p className="desc">{appData?.description}</p>
                  <ul className="feature-list">
                    <li>Watch Movie</li>
                    <li>Watch TV series</li>
                    <li>Download Software</li>
                  </ul>
                  <a
                    href={
                      options.has_mobile_app
                        ? `${MainServerURL}/app/download.php`
                        : appData?.downloadLink
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="download-link"
                  >
                    <Row>
                      <Col xs={4} className="icon-area">
                        <i className="fab fa-google-play"></i>
                      </Col>
                      <Col xs={8} className="text-area">
                        <p className="title">{appData?.appName}</p>
                        <p className="desc">Download Now</p>
                      </Col>
                    </Row>
                  </a>
                </Col>
              </Row>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AppPopup;
