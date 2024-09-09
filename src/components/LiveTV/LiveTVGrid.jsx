import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { get_tv_logo_path, _HIT_ORIGIN } from "../../tools";

export function TVLogo({ dataObj,className="",alt="",...rest }) {
  const no_logo = `${_HIT_ORIGIN}/no-logo.png`;
  const [src, setSrc] = useState(no_logo);
  useEffect(() => {
    setSrc(get_tv_logo_path(dataObj?.logo));
  }, [dataObj]);
  return (
    <img
      src={src}
      alt={alt}
      className={`live-tv-logo ${className}`}
      onError={() => setSrc(no_logo)}
      {...rest}
    />
  );
}

export function LiveTVCard({ id, item }) {
  return (
    <div className="live-tv-card">
      <NavLink
        to={`/live-tv/${item?.name}`}
        style={{
          width: "100%",
        }}
      >
        <div className="card-wrap">
          <TVLogo dataObj={item} />
          <div className="body-box">
            <p className="live-tv-name dotted-text">{item?.name}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

const LiveTVGrid = ({ title = "", data = [] }) => {
  return data.length !== 0 ? (
    <section>
      <div className="theme-container">
        {title && <h4 className="text-light">{title}</h4>}
        <Row xs={2} sm={4} md={6}  className="g-2">
          {data?.map((item, i) => (
            <Col key={i}>
              <LiveTVCard item={item} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  ) : (
    ""
  );
};

export default LiveTVGrid;
