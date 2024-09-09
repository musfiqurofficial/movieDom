import React from "react";
import Footer from "./Footer";
import MobileBottomNavBar from "./MobileBottomNavBar";
import NavBar from "./NavBar";

const PageLayOut = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
      <MobileBottomNavBar/>
    </>
  );
};

export default PageLayOut;
