import React from "react";
import { useState } from "react";
import { getTrackBackground, Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { CONTENT_TYPE } from "../../../../../const";
import { fitlerSelector, updateMoviesFilter, updateTvSeriesFilter } from "../../../../../redux/slices/filter_slice";
import FSicon from "../../../icons/FSicon";

const STEP = 1;
const MIN = 0;
const MAX = 10;

const Filter = ({ type }) => {

  const filter=useSelector(fitlerSelector);
  const dispatch=useDispatch();
  const ratting = [selectRatting('minrating'),selectRatting('maxrating')];
  const [val, setVal] = useState(ratting);
  
  function selectRatting(prop){
    const initial_ratting={
      minrating:0,
      maxrating:10,
    };
      switch (type) {
        case CONTENT_TYPE.MOVIES:
            return filter.movies[prop] || initial_ratting[prop];

        case CONTENT_TYPE.TVSERIES:
            return filter.tvSeries[prop] || initial_ratting[prop];
      
        default:
          return initial_ratting[prop];
      }
  }
  

  // RATTING HANDLER
  function onChange(values) {
    switch (type) {
      case CONTENT_TYPE.MOVIES:
        dispatch(
          updateMoviesFilter({ minrating: values[0], maxrating: values[1] })
        );
        break;
      case CONTENT_TYPE.TVSERIES:
        dispatch(
          updateTvSeriesFilter({ minrating: values[0], maxrating: values[1] })
        );
        break;
      default:
        break;
    }
  }

  

  return (
    <div className="center flex-wrap py-10 px-20 gap-3">
      <output className="letter-spacing-1 fw-600">
        {val[0]}
        <FSicon.Star className="mdom-color-highlight" />{" "}
        <FSicon.ArrowLongRight /> {val[1]}{" "}
        <FSicon.Star className="mdom-color-highlight" />
      </output>
      <Range
        draggableTrack
        values={val}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(val) => setVal(val)}
        onFinalChange={onChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "10px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              className="h-5-px w-100"
              style={{
                background: getTrackBackground({
                  values:val,
                  colors: ["#ffffff50", "#04ff8e", "#ffffff50"],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            className="center h-15-px w-15-px rounded-full mdom-bg-highlight"
            style={{
              ...props.style,
            }}
          >
            <div
              className={`${
                isDragged ? "mdom-bg-highlight" : "mdom-bg-light-20"
              } h-5-px w-5-px`}
            />
          </div>
        )}
      />
    </div>
  );
};

export default Filter;
