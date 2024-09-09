import React, { useRef, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getCommonObj, getTMDBimgPath } from "../../tools";
import { VerticalSlider } from "../SliderSection";
import {
  BannerTrailer,
  LogoOrTitle,
  MuteUnMuteButton,
  ShowMore,
  WatchingButton,
} from "../SmallComponents";
import { LoadingBanner } from "../LoadingSkeleton/Loading";
import MovieDom from "../../api/MovieDom";

const AllPageBanner = React.memo(
  ({
    type,
    filter = type.includes("movie") ? "Hollywood" : "Action & Adventure",
  }) => {
    const bannerVideo = useRef(null);
    const [bannerData, setBannerData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(true);
      if (type.includes("movie")) {
        MovieDom.getMovies({
          category: filter,
          limit: 15,
        }).then((dt) => {
          dt ? setBannerData(dt) : setBannerData([]);
          setLoading(false);
        });
      } else if (type.includes("tv")) {
        MovieDom.getTVShows({
          genre: filter,
          limit: 15,
        }).then((dt) => {
          dt ? setBannerData(dt) : setBannerData([]);
          setLoading(false);
        });
      }
    }, [filter, type]);
    const { id, title, story, backdrop, trailer } =
      bannerData?.length !== 0 && getCommonObj(bannerData[0]);
    return loading ? (
      <LoadingBanner />
    ) : (
        <section className="all-page-banner">
          <section
            className="banner-area"
            style={{
              background: `url("${getTMDBimgPath("original", backdrop)}")`,
            }}
          >
            {trailer && (
              <div
                ref={bannerVideo}
                style={{ height: "100vh", overflow: "hidden !important" }}
              >
                <BannerTrailer
                  height="140vh"
                  width="120%"
                  className="all-page-banner-trailer"
                  trailer={trailer}
                  onPlay={() => {
                    bannerVideo?.current?.classList?.remove("opacity-0");
                    bannerVideo?.current?.classList?.add("opacity-1");
                  }}
                  onEnded={() => {
                    bannerVideo?.current?.classList?.add("opacity-0");
                    bannerVideo?.current?.classList?.remove("opacity-1");
                  }}
                />
              </div>
            )}
            <div
              className="all-page-banner-content"
              style={{ height: "inharit" }}
            >
              <div className="banner-movie">
                <div className="theme-container">
                  <Row>
                    <Col>
                      <LogoOrTitle id={id} imgStyle={{ width: `50%` }}>
                        <h4 className="title">{title}</h4>
                      </LogoOrTitle>
                      <div className="mb-3">
                        <ShowMore className="col-12 text-white">{story}</ShowMore>
                      </div>
                      <div>
                        <WatchingButton
                          MovieID={bannerData[0]?.MovieID}
                          TVID={bannerData[0]?.TVID}
                        />
                      </div>
                    </Col>
                    <Col>
                      <MuteUnMuteButton />
                    </Col>
                  </Row>
                </div>
              </div>
              {bannerData.length !== 0 && (
                <VerticalSlider heading="" datas={bannerData} />
              )}
            </div>
          </section>
        </section>
    );
  }
);

export default AllPageBanner;
