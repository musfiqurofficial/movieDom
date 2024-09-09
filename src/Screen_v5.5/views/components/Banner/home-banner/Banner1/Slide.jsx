import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { LogoOrTitle } from "../../../../../../components/SmallComponents";
import { LSContext } from "../../../../../../Context/LSContextProvider";
import { WindowContext } from "../../../../../../Context/WindowContextProvider";
import { img_path, str_to_arr } from "../../../../../../tools";
import { ButtonOne, IconButton } from "../../../common/buttons/Buttons";
import BannerTrailer from "../../../common/Trailer/BannerTrailer";
import Image, { IMG_TYPE } from "../../../helper/Image";
import FSicon from "../../../icons/FSicon";

const INITIAL__PLAYBAR = { played: 0, loaded: 0 };

const ActionBtns = ({ dataObj = {} }) => {
  const { data, updateLSDBLIST_By_context } = useContext(LSContext);
  const _exist_in_my_list = data?._my_list?.find((item) =>
    dataObj.MovieID
      ? dataObj.MovieID === item.MovieID
      : dataObj.TVID === item.TVID
  );
  function toggle_from_list() {
    updateLSDBLIST_By_context(
      "_my_list",
      dataObj,
      _exist_in_my_list ? "remove" : "add"
    );
  }

  return (
    <ul className="action-btns d-flex gap-10 flex-row">
      {[
        {
          name: "Favourite",
          action: toggle_from_list,
          active: _exist_in_my_list,
          active_icon: <FSicon.BookmarkS />,
          inactive_icon: <FSicon.BookmarkR />,
        },
        {
          name: "Bookmark",
          action: () => console.log("actin_btn_function"),
          active: true,
          active_icon: <FSicon.HeartS />,
          inactive_icon: <FSicon.HeartR />,
        },
      ].map((item, index) => (
        <li key={index}>
          <button
            className="h-40-px w-40-px fs-18 center mdom-bg-primary rounded-full"
            onClick={item.action}
          >
            {item.active ? item.active_icon : item.inactive_icon}
          </button>
        </li>
      ))}
    </ul>
  );
};

const Slide = ({ dataObj = {}, isActive = false }) => {
  const [progress, setProgress] = useState(INITIAL__PLAYBAR);
  const [playTrailer, setPlayTrailer] = useState(true);
  const [isplaying, setIsPlaying] = useState(false);
  const genre =
    dataObj?.MovieGenre?.split(",").filter((ele) => !!ele) ||
    dataObj?.TVgenre?.split(",").filter((ele) => !!ele);

  const {
    muted,
    handlePlayBanner,
  } = useContext(WindowContext);
  const trailer = str_to_arr(
    dataObj.MovieTrailer || dataObj.TVtrailer,
    ","
  )?.[0]?.trim();
  const playing = isActive;

  const handlePlayPauseReplay = () => {
    handlePlayBanner(true);
    if (progress.played < 99) {
      setPlayTrailer((state) => !state);
    } else {
      setProgress(INITIAL__PLAYBAR);
    }
  };

  function renderBannerImage() {
    return (
      <Image
        type={IMG_TYPE.BACKDROP}
        src={img_path(dataObj)}
        alt={dataObj.title}
        className="backdrop"
        style={{
          transition: "all 0.2s ease",
        }}
      />
    );
  }

  return (
    <div className="mdom-banner">
      <div className="media">
        {renderBannerImage()}
        {!!trailer && progress.played < 99 && (
          <div
            style={{
              opacity: isplaying ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <BannerTrailer
              trailer={trailer}
              muted={muted}
              playing={isActive}
              onProgress={(tr) =>
                setProgress({
                  played: tr.played * 100,
                  loaded: tr.loaded * 100,
                })
              }
              onReady={() => setIsPlaying(true)}
              onPlay={() => setIsPlaying(true)}
              onEnd={() => {
                setIsPlaying(false);
                setPlayTrailer(false);
              }}
              onPause={() => setIsPlaying(false)}
              onError={() => setIsPlaying(false)}
              onBufferStart={() => setIsPlaying(false)}
              onBufferEnd={() => setIsPlaying(true)}
            />
          </div>
        )}
      </div>
      <Container>
        <Row>
          <Col xs={12} md={6} lg={4}>
            <div className="overview mb-50">
              <LogoOrTitle
                id={dataObj?.MovieID || dataObj?.TVID}
                year={dataObj?.MovieYear || dataObj?.TVrelease}
              >
                <h4 className="title text-light  mb-10">
                  {dataObj?.MovieTitle || dataObj?.TVtitle} (
                  {dataObj?.MovieYear || dataObj?.TVrelease})
                </h4>
              </LogoOrTitle>
              <ul className="tags mb-10">
                {(dataObj.MovieCategory || dataObj.TVcategory) && (
                  <li>
                    <NavLink
                      to={`/${
                        dataObj.MovieID ? "movies" : "tv-series"
                      }?category=${
                        dataObj.MovieCategory || dataObj.TVcategory
                      }`}
                      className="tag"
                    >
                      {dataObj.MovieCategory || dataObj.TVcategory}
                    </NavLink>
                  </li>
                )}
                {!!genre?.length &&
                  genre?.map((ele) => (
                    <li>
                      <NavLink
                        to={`/${
                          dataObj.MovieID ? "movies" : "tv-series"
                        }?genre=${ele}`}
                        className="tag"
                      >
                        {ele}
                      </NavLink>
                    </li>
                  ))}
              </ul>
              <p className="desc  mb-10 text-in-two">
                {dataObj?.MovieStory || dataObj?.TVstory}
              </p>
              <div className="btns  mb-10">
                <ActionBtns dataObj={dataObj} />
                <ButtonOne
                  to={`/${dataObj.MovieID ? "movies" : "tv-series"}/${
                    dataObj.MovieID || dataObj.TVID
                  }`}
                >
                  Play Now <FSicon.Play />
                </ButtonOne>
              </div>
              <div className="trailer-controller">
                {/* <div
                  className="progress-bar"
                  style={{
                    "--progress": `${progress.played}%`,
                    "--loaded": `${progress.loaded}%`,
                    width: "auto",
                  }}
                ></div> */}
                <div className="btns">
                  {/* <IconButton type="button" onClick={handlePlayPauseReplay}>
                    {progress.played < 99 ? (
                      !playing ? (
                        <FSicon.Play />
                      ) : (
                        <FSicon.Pause />
                      )
                    ) : (
                      <FSicon.Replay />
                    )}
                  </IconButton> 
                  <IconButton type="button" onClick={handleToggleMuted}>
                    {muted ? <FSicon.MuteS /> : <FSicon.SoundS />}
                  </IconButton>*/}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Slide;
