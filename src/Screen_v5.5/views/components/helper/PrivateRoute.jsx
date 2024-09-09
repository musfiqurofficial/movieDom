import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { _STATUS } from "../../../type";

const PrivateRoute = ({ non_user, children }) => {
  const navigate = useNavigate();
  const { user, status } = useSelector((store) => store);
  const user_uid=user?.account?.uid;
  if (status === _STATUS.SUCCESS || true) {
    if (non_user) {
        user_uid && navigate("/manage-profiles");
      return user_uid ? null : children;
    } else if (!non_user) {
      !user_uid && navigate("/auth/signin");
      return user_uid ? children : null;
    }
  } else if (status === _STATUS.PENDING) {
    return <h1>Loading...</h1>;
  }
};

export default PrivateRoute;
