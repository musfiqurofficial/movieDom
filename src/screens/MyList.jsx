import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button, ButtonGroup, Col, Row, Tab, Tabs } from "react-bootstrap";
import { MobileCard, PosterVideoCard } from "../components/Cards";
import { IoPhonePortrait } from "react-icons/io5";
import { BsFillPhoneLandscapeFill } from "react-icons/bs";
import { WindowContext } from "../Context/WindowContextProvider";
import { scrollToTop } from "../tools";
import { LSContext } from "../Context/LSContextProvider";
const MyList = () => {
  const { data: LSData, updateLS } = useContext(LSContext);
  const [choice, setChoice] = useState("portrait");
  const { notDesktop } = useContext(WindowContext);
  // -----
  useEffect(() => {
    if (LSData.cardType) {
      setChoice(LSData.cardType);
    } else {
      updateLS("settings", { cardType: choice });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LSData, choice]);
  
  useLayoutEffect(() => {
    scrollToTop();
  }, []);
  
  const my_list_movies = LSData?._my_list?.filter((item) => item?.MovieID);
  const my_list_tv_series = LSData?._my_list?.filter((item) => item?.TVID);
 

  return (
    <div className="my_list_page">
      <div
        className="theme-container header"
        style={{
          backgroundImage: `url('backgorund.jpg'), linear-gradient(to bottom,#000,red,#161616)`,
        }}
      >
        <h3 className="header-title">My List</h3>
        <p className="header-desc">
          {my_list_movies?.length} Movies & {my_list_tv_series?.length} TVseries
        </p>
        {!notDesktop && (
          <ButtonGroup>
            <Button
              className={`p-2 ${choice === "portrait" ? "active" : ""}`}
              onClick={() => updateLS("settings", { cardType: "portrait" })}
            >
              <BsFillPhoneLandscapeFill />
            </Button>
            <Button
              className={`p-2 ${choice === "landscape" ? "active" : ""}`}
              onClick={() => updateLS("settings", { cardType: "landscape" })}
            >
              <IoPhonePortrait />
            </Button>
          </ButtonGroup>
        )}
      </div>


      {/* <GenreSlider /> */}

      <section className="my-list-item-section">
        {LSData?._my_list ? (
          LSData?._my_list?.length !== 0 ? (
            <Tabs
              defaultActiveKey={
                my_list_movies.length !== 0
                  ? "my_list_movies"
                  : "my_list_tv_series"
              }
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab
                eventKey="my_list_movies"
                title={
                  <>
                    Movies <span className="badge">{my_list_movies?.length}</span>
                  </>
                }
              >
                <div className="theme-container">
                  <Row
                    xs={3}
                    md={choice === "portrait" ? 4 : 3}
                    lg={choice === "portrait" ? 6 : 4}
                    className="g-2 g-md-3 g-lg-4"
                  >
                    {my_list_movies?.length !== 0 ? (
                      my_list_movies?.map((item) => (
                        <Col key={item.id}>
                          {notDesktop?<MobileCard dataObj={item}/>:<PosterVideoCard dataObj={item} choice={choice} />}
                        </Col>
                      ))
                    ) : (
                      <h3 className="no-item-text">
                        You have no Movie in your list.
                      </h3>
                    )}
                  </Row>
                </div>
              </Tab>
              <Tab
                eventKey="my_list_tv_series"
                title={
                  <>
                    TV Series{" "}
                    <span className="badge"> {my_list_tv_series?.length}</span>
                  </>
                }
              >
                <div className="theme-container">
                  <Row
                    xs={3}
                    md={choice === "portrait" ? 4 : 3}
                    lg={choice === "portrait" ? 6 : 4}
                    className="g-2 g-md-3 g-lg-4"
                  >
                    {my_list_tv_series?.length !== 0 ? (
                      my_list_tv_series?.map((item) => (
                        <Col key={item.id}>
                          {notDesktop ?<MobileCard dataObj={item}/> :<PosterVideoCard dataObj={item} choice={choice} />}
                        </Col>
                      ))
                    ) : (
                      <h3 className="no-item-text">
                        You have no TV series in your list.
                      </h3>
                    )}
                  </Row>
                </div>
              </Tab>
            </Tabs>
          ) : (
            <div className="theme-container">
              <h3 className="no_my_list_text">Your list is empty</h3>
            </div>
          )
        ) : (
          <div className="theme-container">
            <h3 className="no_my_list_text">Your list is empty</h3>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyList;
