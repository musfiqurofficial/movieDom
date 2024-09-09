import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import MovieDom from "../../api/MovieDom";
import { LiveTVCard } from "./LiveTVGrid";

const AllLiveTV = () => {
  const [live_tvs, setLiveTvs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    MovieDom.getLiveTV().then((dt) => {
      setLiveTvs(dt);
      setLoading(false);
    });
  }, []);

  if (loading) {
    <div
      style={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <Spinner animation="border" color="white" />
    </div>;
  }

  if (!loading && !live_tvs?.length) {
    return (
      <div className="min-80vh center">
        <h3 className="text-light text-center">Live TV Coming Soon</h3>
      </div>
    );
  }

  return (
    <div className="all-live-page min-80vh" style={{paddingTop:60}}>
      <section>
        <div className="theme-container">
          <h4 className="section-title text-light">All Live TV</h4>
          <div className="live-tv-grid">
            {[...live_tvs]?.map((item, index) => (
              <LiveTVCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllLiveTV;
