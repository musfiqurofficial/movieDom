import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import { Devider, SliderNavigator } from "../../../style/common/Slider";
import Card, { CardTypeTogglers } from "../../components/common/Card";
import Filter from "../../components/Filter/Filter";
import Layout from "../../components/Layout/Layout";
import { useEventListener } from "react-haiku";
import { H4, P } from "../../../style/typography/typography";
import MovieDom from "../../../../api/MovieDom";
import InfiniteScroll from "react-infinite-scroll-component";
import { goToTop } from "../../../lib/tools";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "react-haiku";
import { CARD_TYPES } from "../../../redux/slice/card-slice";
import { cover_variant, poster_variant } from "../TVSeries/TVSeries";
import { useSelector } from "react-redux";
import useSite from "../../../../Hook/useSite";

export function GoToTop() {
  const [show, setShow] = useState(false);
  useEventListener("scroll", (e) => {
    setShow(() => !!(window.scrollY > window.innerHeight / 2));
  });
  const _handler = () => {
    goToTop();
  };

  return (
    <SliderNavigator
      shadow
      onClick={_handler}
      className={`position-fixed go-to-top  ${show && "show"}`}
      style={{
        right: "3%",
        bottom: "5%",
        zIndex: 1000,
      }}
    >
      <i className="fa-solid fa-up-long"></i>
    </SliderNavigator>
  );
}

function FilterData() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const { card_type } = useSelector((s) => s.card);
const {appName}=useSite();

  const query_obj = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams]
  );

  const loadNextPage = useCallback(() => {
    MovieDom.getSortedItems(
      { ...query_obj, page: page, limit: 30 },
      "movie"
    ).then((dt) => {
      if (dt.length) {
        setData((preData) => [...preData, ...dt]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    });
    setPage((state) => state + 1);
  }, [page, query_obj]);

  useEffect(() => {
    MovieDom.getSortedItems({ ...query_obj, page: 1, limit: 30 }, "movie").then(
      (dt) => {
        setData(dt);
      }
    );
  }, [query_obj]);

  useTitle(`${appName} - Movies`);

  return (
    <div className="py-4">
      <div className="d-flex align-items-center justify-content-between  pt-3 pb-1 pt-md-4 pb-md-3">
        <div className="d-flex align-items-center gap-3">
          <H4 style={{ fontWeight: "500" }} className="me-2">
            Movies
          </H4>
          {query_obj.category && (
            <P as="small" className="mb-0" color="text">
              Category : {query_obj.category}
            </P>
          )}
        </div>
        <div>
          <CardTypeTogglers />
        </div>
      </div>
      <Devider className="mb-3 mb-md-5" />

      <InfiniteScroll
        dataLength={data.length / 30}
        next={() => loadNextPage()}
        hasMore={hasMore}
        style={{
          overflow: "hidden",
        }}
        loader={
          <div className="my-5  center">
            <Spinner animation="border" variant="light" />
          </div>
        }
      >
        <Row
          {...(card_type === CARD_TYPES.POSTER
            ? poster_variant
            : cover_variant)}
          className="mx-0 g-2"
        >
          {[...new Set(data)].map((item, index) => (
            <Col key={item.MovieID}>
              <Card all_page data={item} />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </div>
  );
}

const Movies = () => {
  useLayoutEffect(() => {
    goToTop();
  }, []);
  return (
    <Layout>
      <Container className="py-50">
        <Row className="align-items-start py-30">
          <Col xs={12} md={3}>
            <Filter type="movies" />
          </Col>
          <Col xs={12} md={9}>
            <FilterData />
          </Col>
        </Row>
      </Container>
      <GoToTop />
    </Layout>
  );
};

export default Movies;
