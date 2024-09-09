import React, { useEffect, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ReactPlayer from "react-player";
import { Navigate, NavLink, useParams } from "react-router-dom";
import ShakaPlayer from "shaka-player-react";
import "shaka-player-react/dist/controls.css";
import MovieDom from "../../api/MovieDom";
import { _HIT_ORIGIN } from "../../tools";
import NotFound from "../NotFound";
import { TVLogo } from "./LiveTVGrid";
import LiveTVSlider from "./LiveTVSlider";

const ClapprComponent = ({ id, source, height, width }) => {
  let clappr_player = null;
  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   clappr_player = new Clappr.Player({
  //     parentId: `#${id}`,
  //     // url:source,
  //     source:"http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8",
  //     mute: false,
  //     preload: "auto",
  //     autoPlay: "true",
  //     width: "100%",
  //     height: "640px",
  //     fullscreenEnabled: "true",
  //     hideMediaControl: "false",
  //     plugins: [PlaybackRatePlugin, ClapprMarkersPlugin],
  //     markersPlugin: {
  //       markers: [
  //         new ClapprMarkersPlugin.StandardMarker(0, "The beginning!"),
  //         new ClapprMarkersPlugin.StandardMarker(5, "Something interesting."),
  //         new ClapprMarkersPlugin.StandardMarker(9, "The conclusion."),
  //       ],
  //       tooltipBottomMargin: 17, // optional
  //     },
  //     playbackRateConfig: {
  //       defaultValue: 1,
  //       options: [
  //         { value: 0.5, label: "0.5x" },
  //         { value: 1, label: "1x" },
  //         { value: 2, label: "2x" },
  //       ],
  //       // rateSuffix: 'x',
  //     },
  //   });

  //   clappr_player.getPlugin("markers-plugin");

  //   return () => {
  //     clappr_player.destroy();
  //     clappr_player = null;
  //   };
  // }, [source]);

  return (
    <ShakaPlayer
      autoPlay
      src="http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8"
    />
  );

  return (
    <div>
      <div id={id} style={{ minHeight: 640 }}></div>
    </div>
  );
};

function LiveTvPlayer({ dataObj }) {
  const [play, setPlay] = useState(true);
  const [count, setCount] = useState(0);
  const handle = useFullScreenHandle();
  const [volume, setVolume] = useState(1);
  const toggle_play = () => setPlay((state) => !state);
  const toggle_full_screen = () => {
    return handle.active ? handle.exit : handle.enter;
  };
  const onVolumeChange = (e) => setVolume(+e.target.value);

  if (!dataObj?.m3u8) {
    return <p>Source not Found.</p>;
  }

  return (
    <FullScreen handle={handle}>
      <div
        className="position-relative"
        style={{
          background: "#ffffff25",
        }}
        onMouseEnter={() => setCount(0)}
        onMouseMove={() => setCount(0)}
      >
        {count <= 3 && (
          <div
            className="controller position-absolute bottom-0 left-0 w-100 p-1 d-flex justify-content-between"
            style={{
              background: "linear-gradient(to top,#000000, transparent)",
              zIndex: 10,
            }}
          >
            <span className="d-flex align-items-center">
              <button
                className="bg-none text-light p-2 me-2"
                onClick={toggle_play}
              >
                {play ? (
                  <i
                    class="fas fa-pause-circle text-light"
                    style={{ fontSize: "20px" }}
                  ></i>
                ) : (
                  <i
                    class="fas fa-play-circle"
                    style={{ fontSize: "20px" }}
                  ></i>
                )}
              </button>
              <img
                src={`${_HIT_ORIGIN}/live-tv-icon.png`}
                alt=""
                style={{ width: "25%" }}
              />
              <span className="d-flex gap-1 ms-2 align-items-center">
                <i
                  class={`fas ${
                    volume ? "fa-volume-up" : "fa-volume-mute"
                  } text-light`}
                  onClick={() => setVolume((val) => (val ? 0 : 0.5))}
                ></i>{" "}
                <Form.Range
                  className="d-none d-md-inline-block text-light"
                  step={0.1}
                  min={0}
                  max={1}
                  value={volume}
                  style={{
                    maxWidth: "80px",
                  }}
                  onChange={onVolumeChange}
                />
              </span>
            </span>
            <span className="d-flex align-items-center">
              <p className="text-light mb-0 d-none d-md-inline-block">
                {dataObj.name}
              </p>
              <button
                className="bg-none  text-light p-2"
                onClick={toggle_full_screen()}
              >
                {handle.active ? (
                  <i class="fas fa-compress"></i>
                ) : (
                  <i class="fas fa-expand"></i>
                )}
              </button>
            </span>
          </div>
        )}
        <ReactPlayer
          url={dataObj?.m3u8}
          style={{
            aspectRatio: "16/9",
            overflow: "hidden",
          }}
          width="100%"
          height="100%"
          playing={play}
          volume={volume}
          onProgress={() => {
            count <= 3 && setCount((i) => i + 1);
          }}
          // controls
        />
        {/* <div className="mt-2 d-flex justify-content-between align-items-center">
      <img
        src={`${_HIT_ORIGIN}/live-tv-icon.png`}
        alt="Live"
        style={{ maxWidth: 100 }}
      />
      <p className="text-light mb-0 fw-bold">{this_live_tv.name}</p>
      <div className="d-flex gap-2 justify-content-center align-items-center">
        {["#36b6fb", "#f00", "#29f935"].map((color, i) => (
          <span
            className=" rounded-pill d-inline-block"
            style={{
              height: 15,
              width: 15,
              background: color,
            }}
            key={i}
          ></span>
        ))}
      </div>
    </div> */}
      </div>
    </FullScreen>
  );
}

const SingleLiveTV = () => {
  const { live_tv_name } = useParams();
  const [this_live_tv, setThisLiveTV] = useState({});
  const [all_live_tvs, setLiveTvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    MovieDom?.getLiveTV({ search: live_tv_name }).then((dt) => {
      setThisLiveTV(dt[0]);
    });
    MovieDom?.getLiveTV().then((dt) => {
      setLiveTvs(dt);
      setLoading(false);
    });
  }, [live_tv_name]);
  if (error) {
    return <NotFound />;
  }
  if (loading) {
    return (
      <div
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Spinner animation="border" color="white" />
      </div>
    );
  }
  function renderRelatedTVCard(item) {
    return (
      <NavLink
        to={`/live-tv/${item.name}`}
        className={`mb-2 w-100 live-tv-related-card p-1 rounded-2 ${
          this_live_tv.id === item.id ? "active" : ""
        }`}
      >
        <div className="d-flex">
          <TVLogo
            dataObj={item}
            style={{
              maxWidth: 100,
            }}
            className="rounded-3"
          />
          <div className="flex-grow-1 ms-2">
            <h6 className="text-light mb-1">{item?.name}</h6>
            <p className="text-light mb-0">
              category : {item?.category || "_ _ _"}
            </p>
          </div>
        </div>
      </NavLink>
    );
  }

  return live_tv_name !== undefined ? (
    <div>
      <div className="theme-container pt-5" style={{ marginTop: 50 }}>
        <Row className=" g-2">
          <Col xs={12} md={8}>
            <LiveTvPlayer dataObj={this_live_tv} />
          </Col>
          <Col xs={12} md={4} className="d-flex flex-column">
            <h5 className="text-light">Related channel</h5>
            <div
              className="flex-grow-1"
              style={{ height: 500, overflowY: "scroll" }}
            >
              {[...all_live_tvs]
                ?.filter((e) => e.category === this_live_tv.category)
                ?.map((item) => renderRelatedTVCard(item))}
            </div>
          </Col>
        </Row>
      </div>
      <LiveTVSlider title="Live TV" />
    </div>
  ) : (
    <Navigate to="/*" />
  );
};

export default SingleLiveTV;
