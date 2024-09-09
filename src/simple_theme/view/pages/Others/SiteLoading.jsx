import React from "react";
import MovieDom, { LOGO_PATH } from "../../../Api/MovieDom";
import {useTitle} from 'react-haiku';

const SiteLoading = () => {
    useTitle('🕑 Loading...')
  return (
    <div className="center flex-column" style={{ height: "100vh" }}>
      <img
        src={LOGO_PATH}
        alt={MovieDom.appName}
        className="w-100"
        style={{
          maxWidth: 120,
        }}
      />
    </div>
  );
};

export default SiteLoading;
