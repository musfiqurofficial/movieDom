import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import MovieDom from "../../api/MovieDom";
import { MobileCard, PosterVideoCard } from "../Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext } from "react";
import { FilterContext } from "../../Context/FilterContextProvider";
import { WindowContext } from "../../Context/WindowContextProvider";

const AllPageFilteredData = ({ type, sort_by, choice }) => {
  const { filterState } = useContext(FilterContext);
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  // Load filter data function
  function loadData(page) {
    const filter = { ...filterState };
    delete filter.sort_by;
    if (type.includes("movies")) {
      MovieDom.getSortedItems({ ...filter, page: page }, "movie").then((dt) => {
        if (dt.length) {
          setDatas((preData) => [...preData, ...dt]);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      });
    } else if (type.includes("tv-series")) {
      MovieDom.getSortedItems({ ...filter, page: page }, "tv").then((dt) => {
        if (dt.length) {
          setDatas((preData) => [...preData, ...dt]);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      });
    }
    setPage(state=>state+1)
  }

  const { notDesktop } = useContext(WindowContext);

  useEffect(() => {
    setDatas([]);
    const filter = { ...filterState };
    delete filter.sort_by;
    if (type.includes("movies")) {
      MovieDom.getSortedItems({ ...filter, page:1 }, "movie").then((dt) => {
        setDatas(dt);
      });
    } else if (type.includes("tv-series")) {
      MovieDom.getSortedItems({ ...filter, page:1 }, "tv").then((dt) => {
        setDatas(dt);
      });
    }
  }, [filterState,type]);

  useEffect(() => {
    const upTimeOf = (e) => e.uploadTime;
    const sortedBy = datas.sort((a, b) =>
      sort_by === "DESC" ? upTimeOf(b) - upTimeOf(a) : upTimeOf(a) - upTimeOf(b)
    );
    sortedBy && setDatas(sortedBy);
  }, [datas, sort_by]);

  return (
    <InfiniteScroll
      dataLength={datas.length}
      next={() => loadData(page)}
      hasMore={hasMore}
      loader={<h4 className="text-center text-light">Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Row
        id="filter-data"
        xs={3}
        md={choice === "portrait" ? 3 : 2}
        lg={choice === "portrait" ? 4 : 3}
        xl={choice === "portrait" ? 6 : 4}
        className="theme-container py-5 g-1 g-md-2 g-lg-3"
      >
        {datas.map((item) => (
          <Col key={item.id}>
            {notDesktop ? (
              <MobileCard dataObj={item} />
            ) : (
              <PosterVideoCard choice={choice} dataObj={item} />
            )}
          </Col>
        ))}
      </Row>
    </InfiniteScroll>
  );
};

export default AllPageFilteredData;
