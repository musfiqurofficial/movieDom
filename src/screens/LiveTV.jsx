import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import MovieDom from "../api/MovieDom";
import { scrollToTop } from "../tools";

const LiveTV = () => {
  const [live_tv, setLiveTV] = useState([]);
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    scrollToTop();
    setLiveTV([]);
    MovieDom.getLiveTV()
      .then((res) => {
        setLiveTV(res);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const first_TV = live_tv?.[0]?.name;
  if (loading) {
    return (
      <div
        className="center"
        style={{
          height: "100vh",
        }}
      >
        <Spinner animation="border" variant="light" />
      </div>
    );
  }
  if (!first_TV)
    return (
      <div
        className="center"
        style={{
          minHeight: "100vh",
        }}
      >
        <h5 className="text-light fw-bold display-5">LIVE TV Coming soon!</h5>
      </div>
    );
  // not logged in so redirect to login page with the return url
  return <Navigate to={`/live-tv/${first_TV}`} />;
};

export default LiveTV;
