import React, { useEffect, useRef, useState } from "react";
import { Container, Modal, Tabs, Tab } from "react-bootstrap";
import { Button } from "../../../style/common/Button";
import theme from "../../../style/theme";
import { H4, P } from "../../../style/typography/typography";
import Plyr from "plyr-react";
import MovieDom from "../../../Api/MovieDom";
import {
  getEpisodImg,
  getS0E0,
  getServerImgPath,
  saveFile,
} from "../../../lib/tools";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import {
  Devider,
  SliderSection,
  SliderSectionHeader,
} from "../../../style/common/Slider";
import Image from "../../components/common/Image";

const Player = ({ data, movie }) => {
  const [show, setShow] = useState(false);
  const [playerData, setPlayerData] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const next_nav_ref = useRef(null);
  const prev_nav_ref = useRef(null);

  const season_number = episodes?.[episodes?.length - 1]?.season_number;

  const ref = useRef();

  function updatePlayerData(data) {
    setPlayerData(data);
  }

  useEffect(() => {
    if (movie) {
      setPlayerData(data);
      setEpisodes([]);
    } else {
      MovieDom.getTVEpisodes({ tvid: data.TVID }).then((dt) => {
        setPlayerData(dt[0]);
        setEpisodes(dt);
      });
    }
  }, [movie, data]);

  return (
    <section className="py-5">
      <Container
        className=" p-0 p-md-2 p-lg-3 rounded-2 mb-3 rounded-3"
        style={{
          background: theme.dark_lt + "70",
          backdropFilter: "blur(2px)",
        }}
      >
        <Plyr
          ref={ref}
          options={{
            controls: [
              "play-large",
              "rewind",
              "play",
              "fast-forward",
              "volume",
              "mute",
              "progress",
              "current-time",
              "settings",
              "captions",
              "pip",
              "airplay",
              "download",
              "fullscreen",
            ],
            focused: true,
            global: true,
            settings: ["captions", "quality", "speed", "loop"],
            disableContextMenu: false,
            tooltips: { controls: true, seek: true },
          }}
          source={{
            type: "video",
            sources: [
              {
                src: playerData?.watchlink || playerData?.MovieWatchLink,
                type: "video/mp4",
              },
            ],
            poster: data?.MovieID
              ? getServerImgPath(
                  data?.MovieID,
                  data?.backdrops_Poster,
                  "movie",
                  "cover"
                )
              : getEpisodImg(
                  playerData?.TVID,
                  playerData?.season_number,
                  playerData?.episode_number,
                  playerData?.still_path
                ),
            previewThumbnails: {
              src: playerData?.MovieSubtitle,
            },
            tracks: [
              {
                kind: "captions",
                label: "English",
                srclang: "en",
                src: playerData?.MovieSubtitle,
                default: true,
              },
            ],
          }}
        />
      </Container>
      <Container
        className=" p-0 p-md-2 p-lg-3 rounded-2"
        style={{
          background: theme.dark_lt + "70",
          backdropFilter: "blur(2px)",
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <Button className="py-2 px-3" onClick={handleShow}>
            <i className="fa-brands fa-youtube me-1"></i> Trailler
          </Button>
          <P className="pe-2 mb-0">
            {movie
              ? playerData?.MovieTitle
              : ` S${playerData?.season_number}E${playerData?.episode_number} - ${playerData?.name}`}
          </P>
        </div>
      </Container>
      {/* Episodes */}
      {!movie && (
        <Container className="px-0 my-3 rounded-3 overflow-hidden">
          <SliderSection className="px-2 py-3">
            <SliderSectionHeader className="pt-2">
              <H4>EPISODES</H4>
              <Devider />
            </SliderSectionHeader>
            {episodes?.length && (
              <Tabs defaultActiveKey={+season_number} 
              id="episode-tab" className="border-0 episode-slider">
                {[...Array(+season_number)].map((ele, i) => (
                  <Tab title={`Season ${i + 1}`} eventKey={i + 1} tabClassName="bg-none me-3">
                    <Swiper
                      modules={[Navigation]}
                      navigation={{
                        nextEl: next_nav_ref.current,
                        prevEl: prev_nav_ref.current,
                      }}
                      className="py-2"
                      spaceBetween={0}
                      breakpoints={{
                        400: {
                          slidesPerView: 2.2,
                        },
                        600: {
                          slidesPerView: 2.2,
                        },
                        800: {
                          slidesPerView: 3.2,
                        },
                        1024: {
                          slidesPerView: 3.2,
                        },
                        1240: {
                          slidesPerView: 4.2,
                        },
                        1440: {
                          slidesPerView: 6.2,
                        },
                      }}
                    >
                      {episodes
                        ?.filter((ele) => +ele.season_number === i + 1)
                        ?.map((episode, index) => (
                          <SwiperSlide
                            key={index}
                            className="p-2 rounded-3"
                            style={{
                              backgroundColor:
                                episode?.EPIID === playerData?.EPIID
                                  ? theme.light + "10"
                                  : "transparent",
                            }}
                          >
                            <div
                              className="episode"
                              onClick={() => updatePlayerData(episode)}
                            >
                              <Image
                                src={getEpisodImg(
                                  episode.TVID,
                                  episode.season_number,
                                  episode.episode_number,
                                  episode.still_path
                                )}
                                alt=""
                                className="w-100 cover rounded-3"
                              />
                              <small className="mt-1 d-block text-light">{`S${getS0E0(
                                episode.season_number
                              )} E${getS0E0(episode.episode_number)}`}</small>
                              <div className="d-flex justify-content-between align-items-center">
                                <P className="line-1 mb-0 flex-grow-1">
                                  {episode.name}
                                </P>
                                <Button
                                  onClick={() =>
                                    saveFile(
                                      episode?.watchlink,
                                      `${data.TVtitle}-${episode?.name}`
                                    )
                                  }
                                  className="p-2 rounded-pill center "
                                >
                                  <i className="fas fa-download"></i>
                                </Button>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </Tab>
                ))}
              </Tabs>
            )}
          </SliderSection>
        </Container>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        style={{
          background: theme.dark + 80,
          backdropFilter: "blur(3px)",
        }}
      >
        <div
          style={{
            background: theme.dark_lt,
          }}
        >
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title as={H4}>{data.MovieTitle || data.TVtitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="rounded-3 overflow-hidden bg-danger">
              <Plyr
                autoPlay={show}
                source={{
                  type: "video",
                  sources: [
                    {
                      src:
                        data?.MovieTrailer?.trim()?.split(",")[0] ||
                        data?.TVtrailer?.trim()?.split(",")[0],
                      provider: "youtube",
                    },
                  ],
                }}
              />
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </section>
  );
};

export default React.memo(Player);
