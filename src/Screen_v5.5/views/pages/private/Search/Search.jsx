import React from "react";
import { useSelector } from "react-redux";
import { fitlerSelector } from "../../../../redux/slices/filter_slice";
import { Container, Row, Col } from "react-bootstrap";
import PosterHoverCoverCard from "../../../components/common/Card/PosterHoverCoverCard";
import { useEffect } from "react";
import DataApi from "../../../../data/api.data";
import { useState } from "react";
import { debounce } from "lodash";

const Search = () => {
  const { search } = useSelector(fitlerSelector);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setResult([]);
    debounce(() => {
      const result = DataApi.search(search);
      setResult(result || []);
      setLoading(false);
    }, 1000)();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  if (loading) {
    return (
      <div className="min-h-screen-full center">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-50 min-h-screen-full">
      {search && (
        <>
          <Container className="mt-30">
            {search && (
              <h5>
                Search : <code>{search}</code>
              </h5>
            )}
          </Container>
          <hr />
        </>
      )}
      <Container className="mt-20 mb-50">
        <Row xs={3} md={4} lg={6}>
          {result?.map((item, key) => (
            <Col className="p-3">
              <PosterHoverCoverCard dataObj={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Search;
