import React from "react";
import { Container } from "react-bootstrap";

const Renew = () => {
  return (
    <div id="expire">
      <Container>
        <h2 className="title">Your membership is expired.</h2>
        <p className="desc">Please renew your membership.</p>
        <div className="thank">Thank you !</div>
      </Container>
    </div>
  );
};

export default Renew;
