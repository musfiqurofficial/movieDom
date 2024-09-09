import React from "react";
import { Container } from "react-bootstrap";
import PosterHoverCoverCard from "../../../common/Card/PosterHoverCoverCard";

const FilterData = () => {
  return (
    <section className="mt-30 mb-50">
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 10,
          }}
        >
          {[...Array(40)].map((_, index) => (
            <PosterHoverCoverCard key={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FilterData;
