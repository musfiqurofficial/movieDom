import React from "react";
import devicesImage from "../../../../assets/svg/devices.svg";

const SetupAccount = () => {
  return (
    <div id="page">
      <div
        className="setup-account  d-flex justify-content-center mx-auto gap-30"
        style={{
          maxWidth: 388,
          flexDirection: "column",
        }}
      >
        <img src={devicesImage} alt="devices-img" />
        <div className="content text-center">
          <p
            className="step"
          >
            StEP 1 of 3
          </p>
          <h1 className="titl">SETUP ACCOUNT</h1>
          <p className="subtitle w-70 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <button className="btn-secondary"> NEXT </button>
      </div>
    </div>
  );
};

export default SetupAccount;
