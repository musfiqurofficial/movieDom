import React from "react";
import { useSelector } from "react-redux";
import { deviceSelector } from "../../../../../redux/slices/device_slice";
import MDomCoverSlider from "../../../sliders/MDomSliders/MDomCoverSlider";
import MobileBanner from "../../home-banner/Banner1/MobileBanner";
import Banner from "./Banner";

const AllPageBanner1 = ({ data = [] }) => {
  const device = useSelector(deviceSelector);
  const show_mobile_slider = device.is_touch_device || device.is_small_device;
  return show_mobile_slider ? (
    <MobileBanner data={data} />
  ) : (
    <>
      <Banner dataObj={data[0]} />
      <MDomCoverSlider data={data.slice(1)} />
    </>
  );
};

export default AllPageBanner1;
