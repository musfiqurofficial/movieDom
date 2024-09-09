import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { getPoster } from "../../api/getImage";
import MovieDom from "../../api/MovieDom";
import TMDBApi from "../../api/TMDB";
import { WindowContext } from "../../Context/WindowContextProvider";
import useSite from "../../Hook/useSite";
import { MobileCard, PosterVideoCard } from "../Cards";
import ActorSidebar from "./ActorSidebar";


const ActorsMovies = () => {
  const {  notDesktop } = useContext(WindowContext);
  const [cast, setCast] = useState({});
  const [actorMovies, setActorMovies] = useState([]);
  const [actorTV, setActorTV] = useState([]);
  const [searchParams] = useSearchParams();
  const cast_id = searchParams.get("cast_id");
  const {appName}=useSite();

  // Get Cast Items
  useEffect(() => {
    if (cast_id && !cast.name) { TMDBApi.getCastSingle(cast_id).then(dt => setCast(dt)) };
    if (cast.name) {
      MovieDom.getItemsByCast('movie', cast.name).then(dt => setActorMovies(dt));
      MovieDom.getItemsByCast('tv', cast.name).then(dt => setActorTV(dt));
    };
  }, [cast_id, cast.name])
  useEffect(()=>document.title=`${appName || ''}-${cast?.name || "Cast Profile"}`,[cast?.name,appName])

  const type = actorMovies.length !== 0 ? 'movie' : '';
  const id = actorMovies.length !== 0 ? actorMovies[0]?.MovieID : '';
  const file_name = actorMovies.length !== 0 ? actorMovies[0].backdrops_Poster : '';



  return (
    <>
      <section className="actor-banner" style={{ background: `url(${getPoster(type, id, file_name)})` }}>
        <div className="theme-container">
          <ActorSidebar cast={cast} />
          <div className='mt-4'>
            {(actorMovies.length !== 0 || actorTV.length !== 0) && <Tabs defaultActiveKey={"movie"} className="mb-3">
              {actorMovies.length !== 0 && <Tab eventKey={actorMovies.length !== 0 ? "movie" : 'tv'} title="Movies">
                <div>
                  <Row xs={3} md={4} lg={6} className="g-2 g-md-3">
                    {actorMovies.length !== 0 && actorMovies.map((item) => (
                      <Col id={item} key={item.id}>
                        {notDesktop ? <MobileCard dataObj={item} /> : <PosterVideoCard dataObj={item} />}
                      </Col>
                    ))}
                  </Row>
                </div>
              </Tab>}
              {actorTV.length !== 0 && <Tab eventKey="tv" title="TV Series">
                <div>
                  <Row xs={3} md={4} lg={6} className="g-2 g-md-3">
                    {actorTV.map((item) => (
                      <Col id={item} key={item.id}>
                        {notDesktop ? <MobileCard dataObj={item} /> : <PosterVideoCard dataObj={item} />}
                      </Col>
                    ))}
                  </Row>
                </div>
              </Tab>}
            </Tabs>}
          </div>
        </div>
      </section>
    </>
  );
};

export default ActorsMovies;
