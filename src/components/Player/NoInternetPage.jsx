import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./Context/DataContext";
const NoInternetPage = ({ classList }) => {
  const navigate = useNavigate();
  const { playerData } = useContext(DataContext);
  return (
    <div className={classList.no_internet_page}>
      <h2>Pardon the interruption</h2>
      <p>
        We're having trouble playing <b>{playerData?.activeItem?.title}</b>.
        Please check your internet connection and try again.
      </p>
      <div>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </div>
  );
};

export default NoInternetPage;
