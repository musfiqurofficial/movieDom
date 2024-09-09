import { get_continuous_movies } from "./continue_watching_movie";
import { get_continuous_tv_series } from "./continue_watching_tv_show";

export const store_name = "watching_combination";

export const get_all_watching_item = () => {
  return JSON.parse(localStorage.getItem(store_name));
};

export const update_all_watching_item = ({ payload = {}, type = "", remaining_time }) => {
  const previous_all_watching_item = get_all_watching_item();
  const isEnding = payload?.MovieID && remaining_time <= 15;

  if (isEnding) {
    // remove movie from list
    const other_items = previous_all_watching_item?.filter((item) => item?.MovieID !== payload?.MovieID);
    localStorage.setItem(store_name, JSON.stringify(other_items));

  } else {
    if (previous_all_watching_item) {
      const is_already_axist = previous_all_watching_item?.find((item) =>
        type.includes("movie")
          ? item.MovieID === payload.MovieID
          : item.TVID === payload.TVID
      );

      if (is_already_axist) {
        const other_items = previous_all_watching_item?.filter((item) =>
          type.includes("movie")
            ? item.MovieID !== payload.MovieID
            : item.TVID !== payload.TVID
        );
        if (type.includes("movie")) {
          const previousMovie = get_continuous_movies();
          const updated_item = [
            previousMovie ? previousMovie[0] : is_already_axist,
            ...other_items,
          ];
          localStorage.setItem(store_name, JSON.stringify(updated_item));
        } else {
          const previouseTVShow = get_continuous_tv_series();
          const updated_item = [
            previouseTVShow ? previouseTVShow[0] : is_already_axist,
            ...other_items,
          ];
          localStorage.setItem(store_name, JSON.stringify(updated_item));
        }
      } else {
        const updated_item = [payload, ...previous_all_watching_item];
        localStorage.setItem(store_name, JSON.stringify(updated_item));
      }
    } else {
      localStorage.setItem(store_name, JSON.stringify([payload]));
    }
  }
};
