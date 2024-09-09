import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children = "" }) => {
  return (
    <main className={`theme`}>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
