import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LSContext } from "../../../../../../Context/LSContextProvider";
import { img_path } from "../../../../../../tools";
import Image, { IMG_TYPE } from "../../../helper/Image";
import FSicon from "../../../icons/FSicon";
import { Ratting } from "../../../sliders/slides/CoverSlide";

const MobileBannerSlide = ({ dataObj = {} }) => {
  const { data, updateLSDBLIST_By_context } = useContext(LSContext);
  const _exist_in_my_list = data?._my_list?.find((item) =>
    dataObj.MovieID
      ? dataObj.MovieID === item.MovieID
      : dataObj.TVID === item.TVID
  );
  function toggle_from_list() {
    updateLSDBLIST_By_context(
      "_my_list",
      dataObj,
      _exist_in_my_list ? "remove" : "add"
    );
  }

  const genre =
    dataObj?.MovieGenre?.split(",")
      ?.map((item) => item?.trim())
      .filter((item) => !!item) ||
    dataObj?.TVgenre?.split(",")
      ?.map((item) => item?.trim())
      .filter((item) => !!item);
  const genre_eles = genre.map((item) => (
    <NavLink
      to={`/${dataObj?.MovieID ? "movies" : "tv-series"}/${
        dataObj?.MovieID || dataObj?.TVID
      }?genre=${item}`}
    >
      {item}
    </NavLink>
  ));

  return (
    <div
      className="pt-40 mb-20"
      style={{
        background: `#252e39 url(${img_path(dataObj, true)})`,
        backdropFilter: "blur(5px)",
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-30 py-50 center flex-column mobile-banner-gradient">
        <Image
          type={IMG_TYPE.POSTER}
          src={img_path(dataObj, true)}
          className="rounded-3 mobile-banner-poster"
          alt=""
        />
        <div className="mt-10 text-center center flex-column">
          <h5 className="text-light">
            {dataObj?.MovieTitle || dataObj?.TVtitle}
          </h5>
          <Ratting ratting={+dataObj.MovieRatings || +dataObj?.TVRatings} />
          <figure className="d-flex justify-content-center flex-wrap align-items-center gap-10 mb-2">
            <NavLink
              to={`/${dataObj.MovieID ? "movies" : "tv-series"}/${
                dataObj.MovieID || dataObj.TVID
              }?category=${dataObj.MovieCategory || dataObj.TVcategory}`}
            >
              {dataObj.MovieCategory || dataObj.TVcategory}
            </NavLink>{" "}
            |
            {genre_eles?.map((item, i) => (
              <>
                {item} {i !== genre_eles?.length - 1 && " | "}
              </>
            ))}
          </figure>
          <p className="desc">
            {dataObj?.MovieStory?.split(" ")?.slice(0, 20)?.join(" ") ||
              dataObj?.TVstory?.split(" ")?.slice(0, 20)?.join(" ")}{" "}
            ...
          </p>
          <figure className="action-btns mt-10 justify-content-center">
            <button className="icon-btn" onClick={toggle_from_list}>
              {_exist_in_my_list ? <FSicon.BookmarkS /> : <FSicon.BookmarkR />}
            </button>
            <button className="icon-btn">
              <FSicon.HeartR />
            </button>
          </figure>
          <NavLink
            to={`/${dataObj?.MovieID ? "movies" : "tv-series"}/${
              dataObj.TVID || dataObj.MovieID
            }`}
            className="mdom-btn flex-row rounded-full gap-10 center"
          >
            Play Now <i class="fas fa-play"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MobileBannerSlide;
