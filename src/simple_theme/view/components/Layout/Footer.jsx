import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { A } from "../../../style/common/Tag";
import { Logo } from "../../../style/layout/Navbar";
import theme from "../../../style/theme";
import { P } from "../../../style/typography/typography";

const Footer = () => {
  return null;
  return (
    <footer  style={{background:theme.dark_lt}}>
      {/* <Container className="center justify-content-between gap-2 py-3">
        <A as={NavLink} to="/">
          <Logo
            alt="LOGO"
            src={LOGO_PATH}
            style={{
              maxWidth: LOGO_WIDTH * 1.5,
              width: "100%",
            }}
          />
        </A>
        <Tags>
          <Tag>
            <A className="center gap-1">
              <i className="fa-brands fa-facebook"></i>
              Facebook
            </A>
          </Tag>
          <Tag>
            <A className="center gap-1">
              <i className="fa-brands fa-facebook"></i>
              Facebook
            </A>
          </Tag>
        </Tags>
      </Container> */}
      <Container className="center justify-content-between py-3 mt-3">
        {/* <Devider /> */}
        <A as={NavLink} to="/">
          {/* <Logo
            alt="LOGO"
            src={LOGO_PATH}
            style={{
              maxWidth: LOGO_WIDTH.value*0.8,
              width: "100%",
            }}
          /> */}
        </A>
        <P className="text-center mb-0">
          ©2022 <A href="http://moviedom.live/" style={{color:theme.primary}}>Moviedom</A> . All Rights
          Reserved. Developed By <A href="http://moviedom.live/" style={{color:theme.primary}}>Moviedom</A>
        </P>
        {/* <Devider /> */}
      </Container>
    </footer>
  );
};

export default Footer;
