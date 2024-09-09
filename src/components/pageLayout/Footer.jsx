import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useSettings from "../../Hook/useSettings";
import { ALink } from "../SmallComponents";

const Footer = () => {
  const { pathname } = useLocation();
  const footer = useRef(null);
  const settings = useSettings();
  useEffect(() => {
    if (!pathname.includes("player")) {
      footer.current.innerHTML = settings?.footer;
    }
  }, [settings]);
  return !pathname.includes("/player") ? (
    <footer className="ft-copyright">
      <div className="ft-left">
        <p ref={footer}></p>
      </div>
    </footer>
  ) : (
    <></>
  );
};

export default Footer;
